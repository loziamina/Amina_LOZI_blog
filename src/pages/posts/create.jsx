import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"

const initialValues = {
  description: "",
}

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(5, "La description doit comporter au moins 5 caractères")
    .required("La description est requise"),
})

const CreatePostPage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:3000/api/posts", values)
      resetForm()
      alert("Post créé avec succès !")
    } catch (error) {
      console.error("Erreur lors de la création du post :", error)
      alert("Une erreur s'est produite lors de la création du post.")
    }
  }

  return (
    <div>
      <h2>Create a new Post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <Field
              type="text"
              name="description"
              className="form-control"
              placeholder="Entrez une description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePostPage
