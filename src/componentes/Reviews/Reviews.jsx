import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import style from "./Reviews.module.css";
import { Link, useParams } from "react-router-dom";
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
      await dispatch(
        postReviews(
          idKey,
          value,
          review,
          auth?.token.name,
          auth?.token.surName,
          auth?.token.imageUrl
        )
      );
      setSubmitSuccess("Review posted successfully");
      setReview(""); // Limpiar el formulario
      setValue(null);
    } catch (error) {
      setSubmitError("Error posting review");
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    const truncatedText = userInput.slice(0, 600);
    setReview(truncatedText);
  };

  useEffect(() => {
    // Llama a la acción fetchReviews cuando el componente se monta
    console.log("aca estan:", allReviews);
    dispatch(fetchReviews());
  }, [dispatch]);

  const allReviews = useSelector((state) => state.reviews);

  const productReviews = allReviews.filter(
    (review) => review.productId == idKey
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
                            {review.name} {review.surName}
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
              <br />
              <div className={style.userContent}>
                {auth?.token?.imageUrl ? (
                  <img
                    src={auth.token.imageUrl}
                    style={{
                      borderRadius: "50%",
                      height: "34px",
                      width: "34px",
                    }}
                    alt="user-avatar"
                  />
                ) : (
                  <img
                    src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                    style={{
                      borderRadius: "50%",
                      height: "34px",
                      width: "34px",
                    }}
                    alt="default-avatar"
                  />
                )}
                <h4>
                  {auth?.token.name} {auth?.token.surName}
                </h4>
              </div>
              <div className={style.reviewInfo}>
                <p>
                  Las opiniones son públicas y contienen la información de tu
                  cuenta y tus calificaciones sobre los productos.
                </p>
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
                style={{ width: "300px" }}
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
                <div className={style.reviewTitleContainer}>
                  <h3 className={style.reviewTitle}>PRODUCT REVIEWS</h3>
                </div>
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
                            {review.name} {review.surName}
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
                      marginBottom: "30px",
                      justifyContent: "center",
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
  }
};
export default BasicRating;
