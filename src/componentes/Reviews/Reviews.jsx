import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Form from "react-bootstrap/Form";
import style from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postReviews, fetchReviews } from "../../redux/actions/actions";
import { AuthContext } from "../AuthProvider/authProvider";

const BasicRating = () => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState("");
  const user = useSelector((state) => state.userDataSession);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const idKey = id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await dispatch(
        postReviews(
          idKey,
          value,
          review,
          auth?.token.name,
          auth?.token.imageUrl
        )
      );
      console.log("Respuesta del servidor:", response);
      setSubmitSuccess("Review posted successfully");
      setReview("");
      setValue(null);
    } catch (error) {
      console.error("Error al enviar la revisión:", error.response);
      setSubmitError("Error posting review");
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    const words = userInput.split(" ").filter((word) => word !== " ");
    const truncatedWords = words.slice(0, 60);
    const truncatedText = truncatedWords.join(" ");
    setReview(truncatedText);
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const allReviews = useSelector((state) => state.reviews);

  const productReviews = allReviews.filter(
    (review) => review.productId === idKey
  );
  console.log("REVIEWS DEL PRODUCTO", productReviews);

  if (!auth) {
    return (
      <>
        <div className={style.container}>
          <Form className={style.containerContent}>
            <div className={style.userReviewsContainer}>
              <div className={style.usersReviewsContent}>
                <div className={style.reviewTitleContainer}>
                  <h3 className={style.reviewTitle}>REVIEWS</h3>
                </div>
                <hr style={{ width: "1000px", display: "flex" }} />
                {productReviews.length > 0 ? (
                  productReviews
                    .slice()
                    .reverse()
                    .map((review) => (
                      <div key={review.id} className={style.userReview}>
                        <div className={style.userDataReview}>
                          <div>
                            {review.profileImage && (
                              <img src={review.profileImage} alt="" />
                            )}
                          </div>
                          <h5>
                            {review.name}{" "}
                            <b
                              style={{
                                fontSize: "15px",
                                fontWeight: "100",
                                position: "relative",
                                top: "2px",
                                left: "2px",
                              }}
                            >
                              ↴
                            </b>
                          </h5>
                        </div>
                        <div>
                          <div className={style.userContentReview}>
                            <div className={style.userRatingReview}>
                              <Rating
                                className={style.userRating}
                                value={review.rating}
                                readOnly
                              />
                              <span className={style.ratingNumber}>
                                {review.rating}
                              </span>
                            </div>
                            <div
                              className={style.reviewComment}
                              style={{ maxHeight: "200px" }}
                            >
                              <p>{review.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p
                    style={{
                      position: "relative",
                      top: "14px",
                      color: "#5d0c0c",
                      padding: "4px",
                      backgroundColor: "#df8a8aac",
                      borderRadius: "2px",
                      width: "180px",
                      display: "flex",
                      margin: "0 auto",
                      marginBottom: "30px",
                    }}
                  >
                    ⛔ No reviews available
                  </p>
                )}
              </div>
            </div>
          </Form>
        </div>
      </>
    );
  } else if (auth) {
    return (
      <>
        <div className={style.container}>
          <Form className={style.containerContent}>
            <Form.Group controlId="rating">
              <div className={style.reviewTitleContainer}>
                <h3 className={style.reviewTitle}>REVIEWS</h3>
              </div>
              <br />
              <div className={style.userContent}>
                {auth?.token?.imageUrl && (
                  <img
                    src={auth.token.imageUrl}
                    style={{
                      borderRadius: "50%",
                      height: "34px",
                      width: "34px",
                    }}
                    alt="user-avatar"
                  />
                )}

                <h4>{auth?.token.name}</h4>
              </div>
              <br />
              <div className={style.ratingContainer}>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <span>{value}</span>
              </div>
            </Form.Group>
            <Form.Group controlId="review" className={style.container}>
              <textarea
                className="form-control"
                style={{ width: "400px" }}
                value={review}
                cols="4"
                onChange={handleChange}
                placeholder="What do you think about this product?"
              ></textarea>
              <button variant="primary" type="submit" onClick={handleSubmit}>
                <h5>Send</h5>
              </button>
            </Form.Group>
            <div className={style.userReviewsContainer}>
              <div className={style.usersReviewsContent}>
                <hr style={{ width: "1000px" }} />
                {productReviews.length > 0 ? (
                  productReviews
                    .slice()
                    .reverse()
                    .map((review) => (
                      <div key={review.id} className={style.userReview}>
                        <div className={style.userDataReview}>
                          <div>
                            {review.profileImage && (
                              <img src={review.profileImage} alt="" />
                            )}
                          </div>
                          <h5>
                            {review.name}{" "}
                            <b
                              style={{
                                fontSize: "15px",
                                fontWeight: "100",
                                position: "relative",
                                top: "2px",
                                left: "2px",
                              }}
                            >
                              ↴
                            </b>
                          </h5>
                        </div>
                        <div>
                          <div className={style.userContentReview}>
                            <div className={style.userRatingReview}>
                              <Rating
                                className={style.userRating}
                                value={review.rating}
                                readOnly
                              />
                              <span className={style.ratingNumber}>
                                {review.rating}
                              </span>
                            </div>
                            <div
                              className={style.reviewComment}
                              style={{ maxHeight: "200px" }}
                            >
                              <p>{review.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p
                    style={{
                      position: "relative",
                      top: "14px",
                      color: "#5d0c0c",
                      padding: "4px",
                      backgroundColor: "#df8a8aac",
                      borderRadius: "2px",
                      width: "180px",
                      display: "flex",
                      margin: "0 auto",
                      marginBottom: "30px",
                    }}
                  >
                    ⛔ No reviews available
                  </p>
                )}
              </div>
            </div>
          </Form>
          <hr style={{ width: "1000px", display: "flex" }} />
          <div>
            <h4>OTHER REVIEWS</h4>
          </div>
        </div>
      </>
    );
  }
};
export default BasicRating;