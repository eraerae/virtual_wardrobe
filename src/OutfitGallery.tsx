import { useEffect, useState } from "react";
import { Row, Button } from "react-bootstrap";
import styled from "styled-components";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";

const OutfitsGallery = () => {
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);
  async function fetchImage() {
    let { data, error } = await supabase.from("outfitGallery").select("*");

    console.log(data);
    setImages(data);
  }
  async function deleteOutfit(id: any) {
    const { error } = await supabase
      .from("outfitGallery")
      .delete()
      .eq("id", id);
    fetchImage();
    alert("Your outfit was deleted");
  }
  useEffect(() => {
    fetchImage(); //only gets the images of a certain user if user exists upon opening the page
  }, []);

  useEffect(() => {
    // console.log(images);
  }, [images]);
  return (
    <div>
      <h1>Your Outfits</h1>
      <Center>
        <Link to="/">
          <Button id="primary-button">HOME</Button>
        </Link>
        &nbsp; &nbsp;
        <Link to="/CreateNewOutfit">
          <Button id="primary-button">CREATE OUTFIT</Button>
        </Link>
      </Center>
      <br></br>
      <Row md={4}>
        {images.map((row: any) => (
          <MyCard>
            <br></br>
            <div>
              <img src={row.top_url} />
            </div>
            <div>
              <img src={row.bottom_url} />
            </div>
            <div>
              <img src={row.shoe_url} />
            </div>

            <Button variant="danger" onClick={() => deleteOutfit(row.id)}>
              Delete outfit
            </Button>
            <br></br>
          </MyCard>
        ))}
      </Row>
    </div>
  );
};
export default OutfitsGallery;

const MyCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: solid 1px black;
  align-items: center;
  justify-content: space-evenly;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 150px;
    }
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
