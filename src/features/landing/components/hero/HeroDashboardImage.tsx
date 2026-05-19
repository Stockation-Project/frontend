import { motion, MotionValue } from "framer-motion";
import dashboardImg from "../../../../assets/images/landing-page/dashboard.png";

interface HeroDashboardImageProps {
  yImage: MotionValue<number>;
  scaleImage: MotionValue<number>;
}

const HeroDashboardImage = ({ yImage, scaleImage }: HeroDashboardImageProps) => (
  <motion.div
    style={{ y: yImage, scale: scaleImage }}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    className="relative mt-4 md:mt-10 z-10 max-w-5xl mx-auto w-full px-2 sm:px-6 lg:px-8"
  >
    <div className="p-1 sm:p-2 max-h-[250px] sm:max-h-[450px] md:max-h-[550px] overflow-hidden bg-background-primary/10 backdrop-blur-sm border border-border-primary rounded-lg">
      <img
        src={dashboardImg}
        alt="Ilustrasi Hero"
        className="w-full h-auto object-top object-cover rounded-md"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1/3 sm:h-1/2 bg-gradient-to-t from-background-primary via-background-primary/40 to-transparent pointer-events-none" />
  </motion.div>
);

export default HeroDashboardImage;