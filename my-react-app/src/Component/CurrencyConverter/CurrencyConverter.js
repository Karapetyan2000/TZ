import React from 'react';
import { create } from 'zustand';
import { useMediaQuery } from 'react-responsive';
import './CurrencyConverter.css'; // Импортируйте CSS файл

// Создаем хранилище Zustand с именованным импортом
const useStore = create((set) => ({
  usd: '',
  eur: '',
  setUsd: (value) => set((state) => {
    const usd = value.replace(/[^0-9.]/g, '');
    const eur = usd ? (parseFloat(usd) / 1.07).toFixed(2) : '';
    return { usd, eur };
  }),
  setEur: (value) => set((state) => {
    const eur = value.replace(/[^0-9.]/g, '');
    const usd = eur ? (parseFloat(eur) * 1.07).toFixed(2) : '';
    return { usd, eur };
  }),
}));

const CurrencyConverter = () => {
  const { usd, eur, setUsd, setEur } = useStore();
  const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });

  return (
    <div className={`currency-converter ${isDesktopOrTablet ? 'row' : 'column'}`}>
      <div className="input-container">
        <label>USD</label>
        <input
          type="text"
          value={usd}
          onChange={(e) => setUsd(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>EUR</label>
        <input
          type="text"
          value={eur}
          onChange={(e) => setEur(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;