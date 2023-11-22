import Heading from "@/components/Heading";
import { getReview } from "@/lib/reviews";

const StardewValleyPage: React.FC = async () => {
  const { body, date, image, title } = await getReview("stardew-valley");
  return (
    <div>
      <Heading>{title}</Heading>
      <p className="italic pb-2">{date}</p>
      <img
        src={image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </div>
  );
};

export default StardewValleyPage;
