import getVenue from "@/libs/getVenue";
import Image from "next/image";
import styles from "./page.module.css";

type VenuePageProps = {
  params: Promise<{ vid: string }> | { vid: string };
};

export default async function VenueDetailPage({ params }: VenuePageProps) {
  const resolvedParams = await params;
  const venueDetail = await getVenue(resolvedParams.vid);
  const venue = venueDetail.data;

  if (!venue) {
    return (
      <main className={styles.page}>
        <h1>Venue not found</h1>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div style={{ display: "flex", flexDirection: "row", margin: "20px 0" }}>
        <div style={{ position: "relative", width: "40%", height: "260px" }}>
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        </div>
        <div style={{ margin: "0 30px", textAlign: "left", fontSize: "16px", lineHeight: "1.8" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>{venue.name}</h1>
          <div>Name: {venue.name}</div>
          <div>Address: {venue.address}</div>
          <div>District: {venue.district}</div>
          <div>Province: {venue.province}</div>
          <div>Postal Code: {venue.postalcode}</div>
          <div>Tel: {venue.tel}</div>
          <div>Daily Rate: {venue.dailyrate}</div>
        </div>
      </div>
    </main>
  );
}
