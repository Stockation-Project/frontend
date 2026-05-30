import React, { useState } from "react";
import PageHeader from "@/components/shared/layout/PageHeader";
import { useMarketMovers, useWatchlist } from "@/features/explore";
import StockTable from "@/components/shared/cards/StockTable";
import EmptyState from "@/components/shared/states/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePageTour, ProductTour } from "@/features/product-tour";
import { EXPLORE_TOUR_STEPS } from "@/features/product-tour/steps";

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "trending" | "gainers" | "losers">("trending");
  const [watchlistSearch, setWatchlistSearch] = useState("");
  const [moversSearch, setMoversSearch] = useState("");

  const { data: marketData, isLoading: isMarketLoading } = useMarketMovers();
  const { watchlist, isLoading: isWatchlistLoading } = useWatchlist();

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,
    startTour,
  } = usePageTour({
    steps: EXPLORE_TOUR_STEPS,
    storageKey: "stockation_tour_explore",
    autoStart: true,
  });

  // Mapping data for StockTable
  const mapStocksForTable = (stocks: any[]) => {
    return stocks.map((s) => ({
      id: Math.random(), 
      ticker: s.ticker,
      name: s.name,
      price: s.current_price,
      change: Math.abs(parseFloat(s.change_percent.toFixed(2))),
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
    if (activeTab === "all") displayStocks = marketData.all_stocks;
    else if (activeTab === "trending") displayStocks = marketData.all_stocks.slice(0, 10);
    else if (activeTab === "gainers") displayStocks = marketData.gainers;
    else if (activeTab === "losers") displayStocks = marketData.losers;

    // Filter by search
    if (moversSearch) {
      displayStocks = displayStocks.filter(s =>
        s.ticker.toLowerCase().includes(moversSearch.toLowerCase()) ||
        s.name.toLowerCase().includes(moversSearch.toLowerCase())
      );
    }

    return (
      <div data-tour="explore-stock-list">
        <StockTable
          stocks={mapStocksForTable(displayStocks)}
        />
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <PageHeader
        title="Eksplorasi"
        description="Temukan peluang investasi terbaik di pasar modal Indonesia"
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={startTour}
            className="text-xs gap-1.5 rounded-xl"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Tur Halaman
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-8 no-scrollbar">
        {/* Section 1: Watchlist */}
        <section className="space-y-4" data-tour="explore-watchlist">
          
          {isWatchlistLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          ) : watchlist.length === 0 ? (
            <div className="bg-background-primary border border-dashed border-border-primary rounded-xl p-12">
              <EmptyState
                icon={Search}
                title="Watchlist Kosong"
                description="Belum ada saham yang dipantau. Eksplorasi saham di bawah dan tambahkan ke daftar pantau Anda!"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 bg-background-primary border border-border-primary rounded-xl p-2 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-1">
                <h3 className="text-base font-medium text-text-secondary">Watchlist</h3>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
                  <Input
                    placeholder="Cari di watchlist..."
                    className="pl-10 h-10 rounded-xl bg-background-primary border-border-primary"
                    value={watchlistSearch}
                    onChange={(e) => setWatchlistSearch(e.target.value)}
                  />
                </div>
              </div>
              <StockTable
                stocks={mapStocksForTable(
                  watchlist.filter(s =>
                    s.ticker.toLowerCase().includes(watchlistSearch.toLowerCase()) ||
                    s.name.toLowerCase().includes(watchlistSearch.toLowerCase())
                  )
                )}
              />
            </div>
          )}
        </section>

        {/* Section 2: Market Movers */}
        <section className="space-y-6" data-tour="explore-market-movers">

          <div className="flex flex-col gap-2 bg-background-primary border border-border-primary rounded-xl overflow-hidden p-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center justify-between bg-border-secondary p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "all" ? "bg-background-primary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveTab("trending")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "trending" ? "bg-background-primary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab("gainers")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "gainers" ? "bg-background-primary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                  Top Gainers
                </button>
                <button
                  onClick={() => setActiveTab("losers")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === "losers" ? "bg-background-primary text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    }`}
                >
                  Top Losers
                </button>
              </div>

              <div className="relative w-full md:w-80" data-tour="explore-search">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
                <Input
                  placeholder={`Cari di ${activeTab === "all" ? "semua saham" : activeTab}...`}
                  className="pl-10 h-10 rounded-xl bg-background-primary border-border-primary"
                  value={moversSearch}
                  onChange={(e) => setMoversSearch(e.target.value)}
                />
              </div>
            </div>
            {renderMarketMovers()}
          </div>
        </section>
      </div>

      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={EXPLORE_TOUR_STEPS}
        onNext={nextStep}
        onEnd={endTour}
      />
    </div>
  );
};

export default ExplorePage;
