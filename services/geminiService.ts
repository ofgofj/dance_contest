import { GoogleGenAI, Type } from "@google/genai";
import { Scores, CriterionKey } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    [CriterionKey.Technique]: { 
      type: Type.INTEGER,
      description: '技術的なスキル、正確さ、難易度に対するスコア。0から100まで。'
    },
    [CriterionKey.Performance]: { 
      type: Type.INTEGER,
      description: 'ステージ上での存在感、表現力、観客の引き込み度に対するスコア。0から100まで。'
    },
    [CriterionKey.Choreography]: { 
      type: Type.INTEGER,
      description: 'ルーティンの創造性、構成、音楽性に対するスコア。0から100まで。'
    },
    [CriterionKey.Costume]: { 
      type: Type.INTEGER,
      description: '衣装デザイン、小道具、全体的な視覚的プレゼンテーションに対するスコア。0から100まで。'
    },
  },
  required: [CriterionKey.Technique, CriterionKey.Performance, CriterionKey.Choreography, CriterionKey.Costume]
};

export const getAIScores = async (teamName: string, genre: string): Promise<Scores | null> => {
  if (!API_KEY) {
    alert("Gemini APIキーが設定されていません。AI採点機能は使用できません。");
    return null;
  }

  const prompt = `あなたは世界クラスのダンス審査員です。ダンスチーム「${teamName}」が、ジャンル「${genre}」の演技を披露しました。
  
  この情報に基づき、以下の各評価基準について、0から100のスケールで公正かつプロフェッショナルなスコアを付けてください：テクニック、パフォーマンス、振付、衣装・小道具。
  
  提供されたスキーマに従って、スコアをJSON形式で返してください。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });
    
    const jsonText = await response.text();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation
    if (
        typeof parsedJson.technique === 'number' &&
        typeof parsedJson.performance === 'number' &&
        typeof parsedJson.choreography === 'number' &&
        typeof parsedJson.costume === 'number'
    ) {
        return parsedJson as Scores;
    } else {
        throw new Error("AIの応答が期待される形式と一致しませんでした。");
    }

  } catch (error) {
    console.error("Error getting AI scores:", error);
    alert(`AIによる採点支援に失敗しました。詳細はコンソールを確認してください。`);
    return null;
  }
};