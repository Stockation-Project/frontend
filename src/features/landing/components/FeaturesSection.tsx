import { WalletCardsAnimation } from "./features/WalletCardsAnimation";
import { FEATURES } from "./features/featuresData";
import FeaturesSectionHeader from "./features/FeaturesSectionHeader";
import FeatureCardWide from "./features/FeatureCardWide";
import FeatureCardTall from "./features/FeatureCardTall";

const FeaturesSection = () => (
  <section id="fitur" className="py-20 px-4 sm:px-6 bg-background-secondary">
    <div className="max-w-5xl mx-auto">
      <FeaturesSectionHeader />

      <div className="flex flex-col gap-2">
        <FeatureCardWide
          icon={FEATURES[0].icon}
          title={FEATURES[0].title}
          description={FEATURES[0].description}
          delay={0}
          visual={<WalletCardsAnimation />}
          visualPosition="right"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <FeatureCardTall
            icon={FEATURES[1].icon}
            title={FEATURES[1].title}
            description={FEATURES[1].description}
            image={FEATURES[1].image}
            delay={0.15}
            imagePosition="top"
          />
          <FeatureCardTall
            icon={FEATURES[2].icon}
            title={FEATURES[2].title}
            description={FEATURES[2].description}
            image={FEATURES[2].image}
            delay={0.3}
            imagePosition="bottom"
          />
        </div>

        <FeatureCardWide
          icon={FEATURES[3].icon}
          title={FEATURES[3].title}
          description={FEATURES[3].description}
          delay={0.15}
          visual={<img src={FEATURES[3].image} alt={FEATURES[3].title} className="w-full h-full object-cover" />}
          visualPosition="left"
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;