import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const TenantSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Required"),
  displayName: Yup.string().min(2).max(100).required("Required"),
});

const TenantSignup = () => {
  const classes = useStyles();
  const history = useHistory();
  const initialState = { name: "", displayName: "" };

  const handleTenantSignup = async (values) => {
    try {
      const cleanValues = { ...values, name: values.name.trim().toLowerCase() };
      await api.post("/tenants", cleanValues);
      toast.success(
        "Tenant creado correctamente. Ahora puedes crear tu usuario.",
      );
      history.push("/signup");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error creando tenant");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Empresa (Tenant)
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={TenantSchema}
          onSubmit={handleTenantSignup}
        >
          {({ touched, errors }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Nombre corto (ej: empresa-xyz)"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="displayName"
                    label="Nombre completo de la empresa"
                    fullWidth
                    error={touched.displayName && Boolean(errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Crear Empresa
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default TenantSignup;
