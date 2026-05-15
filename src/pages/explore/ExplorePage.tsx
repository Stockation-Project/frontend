import React, { useState } from "react";
import PageHeader from "@/components/shared/layout/PageHeader";
import { useMarketMovers, useWatchlist } from "@/features/explore";
import StockTable from "@/components/shared/cards/StockTable";
import EmptyState from "@/components/shared/states/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "gainers" | "losers">("trending");
  const { data: marketData, isLoading: isMarketLoading } = useMarketMovers();
  const { watchlist, isLoading: isWatchlistLoading } = useWatchlist();

  // Mapping data for StockTable
  const mapStocksForTable = (stocks: any[]) => {
    return stocks.map((s) => ({
      id: Math.random(), // Just for key in table
      ticker: s.ticker,
      name: s.name,
      price: s.current_price,
      change: s.change_percent,
      isPositive: s.change_percent >= 0,
    }));
  };

  const renderMarketMovers = () => {
    if (isMarketLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      );
    }

    if (!marketData) return null;

    let displayStocks: any[] = [];
    if (activeTab === "trending") displayStocks = marketData.all_stocks.slice(0, 10);
    else if (activeTab === "gainers") displayStocks = marketData.gainers;
    else if (activeTab === "losers") displayStocks = marketData.losers;

    return (
      <StockTable 
        title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
        stocks={mapStocksForTable(displayStocks)} 
      />
    );
  };

  return (
    <div className="space-y-8 pb-20">
      <PageHeader 
        title="Eksplorasi" 
        description="Temukan peluang investasi terbaik di pasar modal Indonesia"
      />

      {/* Section 1: Watchlist */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Daftar Pantau Anda</h3>
        </div>
        
        {isWatchlistLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        ) : watchlist.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12">
            <EmptyState 
              icon={Search}
              title="Watchlist Kosong"
              description="Belum ada saham yang dipantau. Eksplorasi saham di bawah dan tambahkan ke daftar pantau Anda!"
            />
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden">
            <StockTable 
              title="Favorit Anda" 
              stocks={mapStocksForTable(watchlist)} 
            />
          </div>
        )}
      </section>

      {/* Section 2: Market Movers */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-slate-100/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("trending")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "trending" ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab("gainers")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "gainers" ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab("losers")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === "losers" ? "bg-white text-brand shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Top Losers
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden p-2">
          {renderMarketMovers()}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
