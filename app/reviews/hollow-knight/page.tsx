import Heading from "@/components/Heading";

const HollowKnightPage: React.FC = () => {
  return (
    <div>
      <Heading>Hollow Knight</Heading>
      <img
        src="/images/hollow-knight.jpg"
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
    </div>
  );
};

export default HollowKnightPage;
