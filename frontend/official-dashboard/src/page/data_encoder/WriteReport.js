import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const WriteReport = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [unions, setUnions] = useState([]);
  const [subCities] = useState(Object.keys(city));
  const [tabyas, setTabyas] = useState([]);

  // Fetch unions from the API
  useEffect(() => {
    const fetchUnions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/account/unions/`,
          {  
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`,
            },
          }
        );
        setUnions(response.data);
      } catch (error) {
        console.error("Error fetching unions:", error);
      }
    };
    fetchUnions();
  }, []);

  const handleSubCityChange = (event, setFieldValue) => {
    const selectedSubCity = event.target.value;
    setFieldValue('sub_city', selectedSubCity);
    setTabyas(city[selectedSubCity] || []);
    setFieldValue('tabya', '');
  };

  const handleFormSubmit = async (values) => {
    console.log(values)
    const formData = {
      title: values.title,
      description: values.description,
      sub_city: values.sub_city,
      tabya: values.tabya,
      metric_ton: values.metric_ton,
      truck_number: values.truck_number,
      delivering_union: values.delivering_union,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/report/write-report/`,
        formData,
        config
      );
      toast.success('report created successfully')
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.detail)
      console.error("Error creating report:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE REPORT" subtitle="Create a new report" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* Report Fields */}
              <TextField
                fullWidth
                variant="filled"
                label="Report Title"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                select
                variant="filled"
                label="Delivering Union"
                name="delivering_union"
                value={values.delivering_union}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  touched.delivering_union && Boolean(errors.delivering_union)
                }
                helperText={touched.delivering_union && errors.delivering_union}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="">Select Delivering Union</MenuItem>
                {unions.map((union) => (
                  <MenuItem key={union.user} value={union.user}>
                    {union.union_name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                label="Metric Ton"
                name="metric_ton"
                type="number"
                value={values.metric_ton}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.metric_ton && Boolean(errors.metric_ton)}
                helperText={touched.metric_ton && errors.metric_ton}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                label="Truck Number"
                name="truck_number"
                value={values.truck_number}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.truck_number && Boolean(errors.truck_number)}
                helperText={touched.truck_number && errors.truck_number}
                sx={{ gridColumn: "span 4" }}
              />

                 <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Sub City"
                    name="sub_city"
                    value={values.sub_city}
                    onBlur={handleBlur}
                    onChange={(e) => handleSubCityChange(e, setFieldValue)}
                    error={touched.sub_city && Boolean(errors.sub_city)}
                    helperText={touched.sub_city && errors.sub_city}
                    sx={{ gridColumn: "span 4" }}
                  >
                    <MenuItem value="">Select Sub City</MenuItem>
                    {subCities.map((subCity) => (
                      <MenuItem key={subCity} value={subCity}>
                        {subCity}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Tabya"
                    name="tabya"
                    value={values.tabya}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.tabya && Boolean(errors.tabya)}
                    helperText={touched.tabya && errors.tabya}
                    sx={{ gridColumn: "span 4" }}
                    disabled={!values.sub_city}
                  >
                    <MenuItem value="">Select Tabya</MenuItem>
                    {tabyas.map((tabya) => (
                      <MenuItem key={tabya} value={tabya}>
                        {tabya}
                      </MenuItem>
                    ))}
                  </TextField>

              <TextField
                fullWidth
                variant="filled"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" variant="contained" color="secondary">
                Save Records
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const city = {
  semen: ['dedebit', 'yekatit', 'meles', 'mesfin', 'industry'],
  hawelti: ['adi shmdhun', 'momona', 'hayelom', 'hidassie', 'selam'],
  ayder: ['sertse', 'gunbot 20', 'marta', 'adi ha', 'may dhan'],
  adi_haki: ['hayelom', 'amora', 'woyane', 'hidassie', 'debre'],
  hadnet: ['metkel', 'smret', 'werie', 'aynalem', 'debre'],
  kedemay_woyane: ['selam', 'hareya', 'walta', 'zeslasse'],
  kuiha: ['abraha', 'asmelash', 'may tsedo'],
};


// Initial Values
const initialValues = {
  title: "",
  description: "",
  sub_city: "",
  tabya: "",
  metric_ton: "",
  truck_number: "",
  delivering_union: "",
};

// Validation Schema
const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  sub_city: yup.string().required("Sub City is required"),
  tabya: yup.string().required("Tabya is required"),
  metric_ton: yup.number().required("Metric Ton is required"),
  truck_number: yup.string().required("Truck Number is required"),
  delivering_union: yup.string().required("Delivering Union is required"),
});

export default WriteReport;
