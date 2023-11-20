import Heading from "@/components/Heading";

const StardewValleyPage: React.FC = () => {
  return (
    <div>
      <Heading>Stardew Valley</Heading>
      <img
        src="/images/stardew-valley.jpg"
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
    </div>
  );
};

export default StardewValleyPage;
