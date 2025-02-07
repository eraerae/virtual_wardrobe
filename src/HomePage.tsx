import * as React from "react";
import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import BasicMenu from "./BasicMenu";
import TypeMenu from "./TypeMenu";

//https://nabwaeiktpnqxwohvril.supabase.co/storage/v1/object/public/testimages/4c696c2d-9327-4887-8f59-0f5288b3daf1/b35bb4de-3a4b-4de0-8f0f-0600e8e4b35a

const CDNURL =
  "https://nabwaeiktpnqxwohvril.supabase.co/storage/v1/object/public/testimages/";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const user = useUser();
  const [images, setImages] = useState<any>([]);
  const supabase = useSupabaseClient();
  console.log(email);

  async function getImages() {
    // function retrieves images from Supabase
    const { data, error } = await supabase.storage
      .from("testimages")
      .list(user?.id + "/", {
        //list images with specified path
        sortBy: { column: "created_at", order: "desc" }, //displays images by date added (newest first)
      });
    if (data !== null) {
      setImages(data); //if data successfully rertrieved set it to state variable
    } else {
      alert("Error loading images"); //if there is an error while retrieving alert
      console.log(error); //for debugging purposes
    }
  }

  useEffect(() => {
    if (user) {
      getImages(); //only gets the images of a certain user if user exists when opening the page
    }
  }, [user]);

  async function linkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      // sends one-time password (OTP) to authenticate and log in to use Supabase
      email: email,
    });
    if (error) {
      alert("Error something went wrong"); //error handling
    } else {
      alert("check your email to log in"); //alert if the log in link has been sent
    }
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut(); //signs out of account
    console.log("signed out"); //for debug purposes
  }

  async function uploadImage(e: any) {
    //hanadling upload to Supabase storage
    let file = e.target.files[0];
    const { data, error } = await supabase.storage //uploading to Supabase bucket "testimages"
      .from("testimages")
      .upload(user?.id + "/" + uuidv4(), file); //upload with specific path and unique identifier

    if (data !== null) {
      setImages(data);
      alert(
        "Item successfully uploaded. Please add a name and type in order to create outfits with this item !"
      );
    } else {
      alert("Error loading images"); //if there is an error alert
      console.log(error);
    }
  }

  async function deleteImage(imageName: any) {
    //delete image from Supabase storage + database
    const { error } = await supabase.storage
      .from("testimages")
      .remove([user?.id + "/" + imageName]);

    const { error: error2 } = await supabase
      .from("wardrobe")
      .delete()
      .eq("image_url", CDNURL + user?.id + "/" + imageName); //delete record where image_url matches specified URL
    getImages();
    alert("Your item was deleted");
  }

  return (
    <Container align="center" className="container-sm mt-4">
      {}
      {user === null ? (
        <>
          <h1> Welcome</h1>
          <Form>
            <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
              <Form.Label>Enter an email to log in</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)} //getting email from new cleint
              />
            </Form.Group>
            <Button onClick={() => linkLogin()}> Get link to log in</Button>
          </Form>
        </> //if the user does not exist
      ) : (
        <>
          <h1> Welcome to Your Wardrobe !</h1>
          Current user is <b>{user.email}</b>
          <BasicMenu />
          <p>Upload an item to your wardrobe</p>
          <Form.Group>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
            />
          </Form.Group>
          <br></br>
          <h3>Your Clothes</h3>
          <br></br>
          <Row md={5} className="g-4">
            {images.map((image: any) => {
              return (
                <Col key={CDNURL + user.id + "/" + image.name}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={CDNURL + user.id + "/" + image.name}
                    />
                    <Card.Body>
                      <TypeMenu
                        imageUrl={CDNURL + user.id + "/" + image.name}
                      />
                      <Button
                        variant="danger"
                        onClick={() => deleteImage(image.name)}
                      >
                        {" "}
                        Delete item
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <br></br>
          <br></br>
          <Button onClick={() => signOut()} id="basic-button">
            SIGN OUT OF YOUR ACCOUNT
          </Button>
        </>
      )}
    </Container>
  );
};
export default HomePage;
