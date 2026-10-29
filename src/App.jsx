
import { useState } from "react";
import "./App.css";

const games = [
  {
    id: 1,
    name: "Super Mario Bros.",
    year: 1985,
    console: "Nintendo Entertainment System",
    developer: "Nintendo",
    genre: "پلتفرمر",
    emoji: "🍄",
    color: "mario",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Super_Mario_Bros._Logo.svg/250px-Super_Mario_Bros._Logo.svg.png",
    description:
      "یکی از مشهورترین بازی‌های تاریخ که بازیکن در آن کنترل ماریو را بر عهده می‌گیرد و برای نجات پرنسس از مراحل مختلف عبور می‌کند.",
  },
  {
    id: 2,
    name: "Minecraft",
    year: 2011,
    console: "PC",
    developer: "Mojang Studios",
    genre: "جهان‌باز و بقا",
    emoji: "⛏️",
    color: "minecraft",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    description:
      "یک بازی جهان‌باز که در آن می‌توانی منابع جمع‌آوری کنی، سازه بسازی، اکتشاف کنی و در حالت بقا با موجودات مختلف روبه‌رو شوی.",
  },
  {
    id: 3,
    name: "Sonic the Hedgehog",
    year: 1991,
    console: "Sega Genesis",
    developer: "Sega",
    genre: "پلتفرمر و سرعتی",
    emoji: "🦔",
    color: "sonic",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Sonic_the_Hedgehog_1_Genesis_box_art.jpg",
    description:
      "یک بازی کلاسیک سرعتی با شخصیت سونیک که باید از موانع عبور کند، حلقه‌ها را جمع کند و جلوی نقشه‌های دکتر اگمن را بگیرد.",
  },
  {
    id: 4,
    name: "Tetris",
    year: 1984,
    console: "Game Boy",
    developer: "Alexey Pajitnov",
    genre: "پازل",
    emoji: "🧩",
    color: "tetris",
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7c/Tetris-VT.png",
    description:
      "یک بازی فکری کلاسیک که در آن باید قطعات هندسی را کنار هم قرار بدهی و با کامل کردن ردیف‌ها، امتیاز بیشتری کسب کنی.",
  },
];

function GameCard({ game, isFavorite, onToggleFavorite, onOpenDetails }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="game-card">
      <button
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        onClick={() => onToggleFavorite(game.id)}
        aria-label={
          isFavorite
            ? `حذف ${game.name} از علاقه‌مندی‌ها`
            : `افزودن ${game.name} به علاقه‌مندی‌ها`
        }
        title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      >
        {isFavorite ? "★" : "☆"}
      </button>

      <button
        className="game-art-button"
        onClick={() => onOpenDetails(game)}
        aria-label={`نمایش جزئیات ${game.name}`}
      >
        <div className={`game-art ${game.color}`}>
          {!imageFailed ? (
            <img
              className="game-image"
              src={game.image}
              alt={game.name}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="game-image-fallback">
              <span className="fallback-emoji">{game.emoji}</span>
              <span className="fallback-title">{game.name}</span>
              <span className="fallback-year">{game.year}</span>
            </div>
          )}
        </div>
      </button>

      <h2>{game.name}</h2>
      <p>📅 سال انتشار: {game.year}</p>
      <p>🕹️ پلتفرم: {game.console}</p>

      <button
        className="details-button"
        onClick={() => onOpenDetails(game)}
      >
        مشاهده جزئیات
        <span>←</span>
      </button>
    </article>
  );
}

function GameDetails({ game, isFavorite, onToggleFavorite, onClose }) {
  if (!game) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="بستن پنجره"
        >
          ×
        </button>

        <div className={`details-banner ${game.color}`}>
          <span>{game.emoji}</span>
          <small>{game.year}</small>
        </div>

        <div className="details-content">
          <span className="details-label">GAME PROFILE</span>
          <h2 id="details-title">{game.name}</h2>
          <p className="details-description">{game.description}</p>

          <div className="details-facts">
            <div>
              <span>سال انتشار</span>
              <strong>{game.year}</strong>
            </div>
            <div>
              <span>سازنده</span>
              <strong>{game.developer}</strong>
            </div>
            <div>
              <span>پلتفرم</span>
              <strong>{game.console}</strong>
            </div>
            <div>
              <span>سبک بازی</span>
              <strong>{game.genre}</strong>
            </div>
          </div>

          <button
            className={`modal-favorite ${isFavorite ? "is-favorite" : ""}`}
            onClick={() => onToggleFavorite(game.id)}
          >
            {isFavorite ? "★ حذف از علاقه‌مندی‌ها" : "☆ افزودن به علاقه‌مندی‌ها"}
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  function toggleFavorite(gameId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(gameId)
        ? currentFavorites.filter((id) => id !== gameId)
        : [...currentFavorites, gameId]
    );
  }

  const filteredGames = games.filter((game) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      game.name.toLowerCase().includes(query) ||
      game.console.toLowerCase().includes(query) ||
      game.developer.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      String(game.year).includes(query);

    const matchesFavorites =
      !showFavorites || favorites.includes(game.id);

    return matchesSearch && matchesFavorites;
  });

  return (
    <main className="app" dir="rtl">
      <header className="site-header">
        <span className="eyebrow">GAME HISTORY ARCHIVE</span>
        <h1>🎮 آرشیو بازی‌های ویدیویی</h1>
        <p>از بازی‌های کلاسیک تا خاطره‌های فراموش‌نشدنی</p>
      </header>

      <section className="welcome-panel">
        <div>
          <span className="welcome-label">مجموعه شخصی تو</span>
          <h2>دنیای بازی‌ها را کشف کن</h2>
          <p>بگرد، اطلاعات بازی‌ها را ببین و موارد دلخواهت را ذخیره کن.</p>
        </div>
        <span className="welcome-icon">🎮</span>
      </section>

      <div className="archive-toolbar">
        <div className="archive-info">
          <span>{showFavorites ? "بازی‌های موردعلاقه" : "مجموعه بازی‌ها"}</span>
          <strong>{filteredGames.length} بازی</strong>
        </div>

        <button
          className={`filter-button ${showFavorites ? "active" : ""}`}
          onClick={() => setShowFavorites((current) => !current)}
        >
          {showFavorites ? "نمایش همه بازی‌ها" : `★ علاقه‌مندی‌ها (${favorites.length})`}
        </button>
      </div>

      <input
        className="search-input"
        type="search"
        placeholder="جست‌وجوی نام بازی، کنسول، سازنده یا سال..."
        aria-label="جست‌وجوی بازی‌ها"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <section className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={toggleFavorite}
              onOpenDetails={setSelectedGame}
            />
          ))
        ) : (
          <div className="empty-message">
            <span>{showFavorites && favorites.length === 0 ? "⭐" : "🔎"}</span>
            <p>
              {showFavorites && favorites.length === 0
                ? "هنوز بازی‌ای را به علاقه‌مندی‌ها اضافه نکرده‌ای."
                : "بازی‌ای پیدا نشد!"}
            </p>
            <small>
              {showFavorites
                ? "یک بازی را با علامت ستاره ذخیره کن یا همه بازی‌ها را ببین."
                : "نام بازی، سازنده یا سال دیگری را جست‌وجو کن."}
            </small>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <span>🎮</span>
        <p>ساخته‌شده برای عاشقان بازی‌های ویدیویی</p>
      </footer>

      {selectedGame && (
        <GameDetails
          game={selectedGame}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </main>
  );
}

export default App;
