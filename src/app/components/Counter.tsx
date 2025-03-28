'use client';

import { useCounterStore } from '@/store';

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Zustand 计数器示例</h2>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold">{count}</span>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          增加
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          减少
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重置
        </button>
      </div>
    </div>
  );
};

export default Counter;
