# Content-based product recommender using free local AI model (sentence-transformers)
#
# Requirements:
#   pip install sentence-transformers torch
#
# Usage:
#   python src/core/recommend_similar_products.py data/mocks/washing_machines/data.json 5
import sys
import json
from sentence_transformers import SentenceTransformer, util
if len(sys.argv) < 2:
    print("Usage: python recommend_similar_products.py <products.json> [query_index]")
    sys.exit(1)
products_file = sys.argv[1]
query_index = int(sys.argv[2]) if len(sys.argv) > 2 else 0
with open(products_file) as f:
    products = json.load(f)
# Extract product titles (concatenate all header values)
# titles = [' '.join([h['value'] for h in p['header']]) for p in products]
titles = [
    f"{' '.join([p.get('brand', '')])}"
    for p in products
]
# Extract additional features for debugging
def extract_features(product):
    features = {
        'brand': product.get('brand', 'Unknown'),
        'color': product.get('color', 'Unknown'),
        'family': product.get('productFamily', {}).get('name', 'Unknown'),
        'price': product.get('price', {}).get('displayPrice', {}).get('amount', 'N/A'),
    }
    return features
print(f"\n🔍 DEBUG: Analyzing {len(products)} products...")
print("=" * 80)
# Load a free, local model
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(titles, convert_to_tensor=True)
# Pick a product to recommend for (by index)
query_embedding = embeddings[query_index]
cos_scores = util.pytorch_cos_sim(query_embedding, embeddings)[0]
# Get query product features
query_features = extract_features(products[query_index])
print(f"🎯 QUERY PRODUCT:")
print(f"   ID: {products[query_index]['id']}")
print(f"   Brand: {query_features['brand']}")
print(f"   Product Family: {query_features['family']}")
print(f"   Price: ${query_features['price']}")
print(f"   Text Features: '{titles[query_index]}'")
print()
# Get top 5 most similar (excluding itself)
top_results = cos_scores.argsort(descending=True)
print("🔍 SIMILARITY ANALYSIS - Top 5 similar products:")
print("-" * 80)
count = 0
for idx in top_results:
    if idx == query_index:
        continue

    candidate_features = extract_features(products[idx])
    score = cos_scores[idx].item()

    print(f"{count+1}. {products[idx]['id']} (Similarity: {score:.3f})")
    print(f"   Brand: {candidate_features['brand']}")
    print(f"   Product Family: {candidate_features['family']}")
    print(f"   Price: ${candidate_features['price']}")
    print(f"   Text Features: '{titles[idx]}'")

    # Analyze why it's similar
    print(f"   🔎 WHY SIMILAR:")

    # # Brand similarity
    # if query_features['brand'] == candidate_features['brand']:
    #     print(f"      ✅ Same brand: {query_features['brand']}")

    # # Product family similarity
    # if query_features['family'] == candidate_features['family']:
    #     print(f"      ✅ Same product family: {query_features['family']}")

    # # Text overlap analysis
    # query_words = set(titles[query_index].lower().split())
    # candidate_words = set(titles[idx].lower().split())
    # common_words = query_words.intersection(candidate_words)
    # if common_words:
    #     print(f"      ✅ Common words: {', '.join(sorted(common_words))}")

    # Price similarity
    try:
        query_price = float(query_features['price']) if query_features['price'] != 'N/A' else None
        candidate_price = float(candidate_features['price']) if candidate_features['price'] != 'N/A' else None
        if query_price and candidate_price:
            price_diff_pct = abs(query_price - candidate_price) / query_price * 100
            if price_diff_pct < 20:
                print(f"      💰 Similar price range (±{price_diff_pct:.1f}%)")
    except:
        pass

    print()
    count += 1
    if count >= 5:
        break