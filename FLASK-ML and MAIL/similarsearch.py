from sentence_transformers import SentenceTransformer, util
from application.utils import get_lost, get_found
model = SentenceTransformer('all-MiniLM-L6-v2')
def search(inputtext,database):
    des=[]
    print("hi")
    print(database)
    for i in database:
        des.append(i['description'])
    sentences=[inputtext['description']]+des
    embeddings = model.encode(sentences, convert_to_tensor=True)
    cosine_scores = util.cos_sim(embeddings, embeddings)
    pairs = []
    for i in range(len(cosine_scores)-1):
        for j in range(i+1, len(cosine_scores)):
            pairs.append({'index': [i, j], 'score': cosine_scores[i][j]})
    pairs = sorted(pairs, key=lambda x: x['score'], reverse=True)
    for pair in pairs:
        i, j = pair['index']
        result={}
        if sentences[i] in inputtext['description']:
            if 'match' not in result:
                result['match']=[]
                result['score']=[]
            result['match'].append(sentences[j])
            result['score'].append(pair['score'])
    temp=[]
    for i in database:
        if i['description'] in result['match']:
            temp.append(i)
    return temp