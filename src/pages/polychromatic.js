import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Polychromatic() {
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [time, setTime] = useState("time loading...");
  const [date, setDate] = useState("date loading...");
  const [coords, setCoords] = useState({});

  const apiKey = process.env.NEXT_PUBLIC_NASA_API;
  const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;
  const getPolychromaticData = async () => {
    const res = await axios.get(url);
    const data = await res.data;
    console.log(data);

    const caption = data[0].caption;
    const date = data[0].date.split(" ")[0];
    const dateFormatted = date.replaceAll("-", "/");

    let times = [];
    let images = [];

    for (let i = 0; i < data.length; i++) {
      let time = data[i].date.split(" ")[1];
      let coords = data[i].centroid_coordinates;
      let image = `https://epic.gsfc.nasa.gov/archive/natural/${dateFormatted}/png/${data[i].image}.png`;

      times.push(time);
      images.push({
        image: image,
        time: time,
        coords: coords,
      });
    }

    setDate(date);
    setImages(images);
    setImage(images[0].image);
    setTime(times[0]);
    setCoords([images[0].coords.lat, images[0].coords.lon]);

    console.log(images);
  };

  useEffect(() => {
    getPolychromaticData();
  }, []);

  return (
    <>
      <h1>Polychromatic</h1>
      <div>
        <Image src={image} alt={image} width={200} height={200} />
        <div>{time}</div>
        <div>
          {coords[0]}, {coords[1]}{" "}
        </div>

        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Lattitude</th>
              <th>Longitude</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.map((o, index) => {
                return (
                  <tr key={index}>
                    <td>{o.time}</td>
                    <td>{o.coords.lat}</td>
                    <td>{o.coords.lon}</td>
                    <td>
                      <Image
                        src={o.image}
                        alt={o.image}
                        width={100}
                        height={100}
                      />
                    </td>
                    <button
                      onClick={() => {
                        setImage(o.image);
                        setTime(o.time);
                        setCoords([o.coords.lat, o.coords.lon]);
                        document.body.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      View
                    </button>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
