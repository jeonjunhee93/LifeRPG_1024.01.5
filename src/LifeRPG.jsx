
import React, { useState } from "react";

const LifeRPG = () => {
  const [quests, setQuests] = useState([]);
  const [newQuest, setNewQuest] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [inventory, setInventory] = useState([]);
  const [gold, setGold] = useState(0);
  const [xp, setXp] = useState(0);
  const [message, setMessage] = useState("");
  const [shopOpen, setShopOpen] = useState(false);

  const handleAddQuest = () => {
    if (!newQuest || !difficulty) return;
    setQuests([
      ...quests,
      {
        id: Date.now(),
        title: newQuest,
        difficulty: parseInt(difficulty),
        completed: false,
        reward: generateReward(parseInt(difficulty)),
      },
    ]);
    setNewQuest("");
    setDifficulty("");
  };

  const generateReward = (diff) => {
    const baseXp = diff * 10;
    const baseGold = diff * 5;
    const reward = {
      xp: baseXp + Math.floor(Math.random() * 10),
      gold: baseGold + Math.floor(Math.random() * 10),
    };
    if (Math.random() < 0.3) {
      reward.item = `아이템 Lv.${diff}`;
    }
    return reward;
  };

  const handleCompleteQuest = (id) => {
    const updated = quests.map((q) => {
      if (q.id === id && !q.completed) {
        setXp(xp + q.reward.xp);
        setGold(gold + q.reward.gold);
        if (q.reward.item) {
          setInventory([...inventory, q.reward.item]);
          setMessage(`${q.reward.item}을(를) 획득하였습니다!`);
          setTimeout(() => setMessage(""), 3000);
        }
        return { ...q, completed: true };
      }
      return q;
    });
    setQuests(updated);
  };

  const handleBuy = (item, cost) => {
    if (gold < cost) {
      alert("골드가 부족합니다!");
      return;
    }
    setGold(gold - cost);
    alert(`${item}을(를) 구매했습니다!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Life RPG</h1>
      <p>XP: {xp} | Gold: {gold}</p>

      <div>
        <h2>퀘스트 추가</h2>
        <input
          value={newQuest}
          onChange={(e) => setNewQuest(e.target.value)}
          placeholder="퀘스트 이름"
        />
        <input
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="난이도 (숫자)"
          type="number"
        />
        <button onClick={handleAddQuest}>추가</button>
      </div>

      <div>
        <h2>퀘스트 목록</h2>
        <ul>
          {quests.map((q) => (
            <li key={q.id}>
              {q.title} (난이도: {q.difficulty}) -{" "}
              {q.completed ? "완료됨" : (
                <button onClick={() => handleCompleteQuest(q.id)}>완료</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>인벤토리</h2>
        <ul>
          {inventory.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>

      <div>
        <h2 onClick={() => setShopOpen(!shopOpen)} style={{ cursor: "pointer" }}>
          상점 {shopOpen ? "▲" : "▼"}
        </h2>
        {shopOpen && (
          <ul>
            <li>
              TV 시청 (30골드)
              <button onClick={() => handleBuy("TV 시청", 30)}>구매</button>
            </li>
            <li>
              유튜브 시청 (20골드)
              <button onClick={() => handleBuy("유튜브 시청", 20)}>구매</button>
            </li>
            <li>
              휴식 30분 (10골드)
              <button onClick={() => handleBuy("휴식 30분", 10)}>구매</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LifeRPG;
