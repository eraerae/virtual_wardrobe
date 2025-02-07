import { useEffect, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import styled from "styled-components";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";

const CreateNewOutfit = () => {
  const supabase = useSupabaseClient();
  const [images, setImages] = useState([]);

  async function fetchImage() {
    let { data, error } = await supabase.from("wardrobe").select("*");

    setImages(data);
  }

  useEffect(() => {
    fetchImage(); //only gets the images of a certain user if user exists upon opening the page
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const [topImage, setTopImage] = useState("");
  const [bottomImage, setBottomImage] = useState("");
  const [shoeImage, setShoeImage] = useState("");

  function handleClick(row: any) {
    console.log(row.type);
    if (row.type === "top") {
      setTopImage(row.image_url);
    } else if (row.type === "bottom") {
      setBottomImage(row.image_url);
    } else if (row.type === "shoes") {
      setShoeImage(row.image_url);
    }
  }

  async function saveOutfit() {
    if (topImage == "" || bottomImage == "" || shoeImage == "") {
      alert("Please complete your outfit before saving");
    } else {
      const {} = await supabase
        .from("outfitGallery")
        .insert([
          { top_url: topImage, bottom_url: bottomImage, shoe_url: shoeImage },
        ])
        .select();
      alert("Your outfit has been saved to your Outfit Gallery !");
    }
  }

  return (
    <Container>
      <ListClothes>
        <h2>Choose items for your outfit</h2>
        <br></br>
        <Row md={2}>
          {images.map((row: any) => (
            <Card onClick={() => handleClick(row)}>
              <Card.Img variant="top" src={row.image_url} />
              <Card.Body>{row.name}</Card.Body>
            </Card>
          ))}
        </Row>
      </ListClothes>

      <Outfit>
        <br></br>
        <h2>New Outfit</h2>
        <div>
          <img src={topImage} />
        </div>
        <div>
          <img src={bottomImage} />
        </div>
        <div>
          <img src={shoeImage} />
        </div>
      </Outfit>
      <Save>
        <Link to="/">
          <Button>HOME</Button>
        </Link>
        <br></br>
        <Button onClick={() => saveOutfit()} id="basic-button">
          <b>
            <u>SAVE OUTFIT</u>
          </b>
        </Button>
        <br></br>
        <Link to="/OutfitGallery">
          <Button>OUTFIT GALLERY</Button>
        </Link>
      </Save>
    </Container>
  );
};
export default CreateNewOutfit;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const ListClothes = styled.div`
  width: 33%;
  height: 100%;
`;

const Outfit = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    background-color: rgba(219, 146, 146, 0.1);
    border: 1px solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 30vh;
    }
  }
`;
const Save = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  Button {
    height: 50px;
    text-align: center;
  }
`;
