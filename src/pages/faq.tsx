import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export function FAQPage() {
  return (
    <Container
      style={{
        flexGrow: 1,
        maxWidth: "100%",
        padding: "4rem 0px",
        backgroundColor: "#e5e5f7",
        opacity: "1",
        backgroundImage:
          "radial-gradient(#444cf7 1.35px, transparent 1.35px), radial-gradient(#444cf7 1.35px, #e5e5f7 1.35px)",
        backgroundSize: "54px 54px",
        backgroundPosition: "0 0,27px 27px",
      }}
    >
      {" "}
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={12}
        height="100%"
      >
        <Grid
          container
          item
          xs={12}
          lg={8}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h1"
              sx={{
                typography: { xs: "h2", md: "h1" },
                fontWeight: { xs: 600, lg: 800 },
              }}
              textAlign="center"
            >
              FAQ
            </Typography>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              columns={12}
              justifyContent="center"
            >
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      What is this?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      Simply put, it's just a property catalog. Scarriot is a
                      side-project I created because I wanted to make it easier
                      for Filipino to look for properties available in PAG-IBIG
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Who is it for?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      Really, it's for everyone wanting to buy foreclosed
                      properties from PAG-IBIG
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Are you selling these properties?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      No, Scarriot is ONLY a catalog and ALL properties listed
                      here are being auctioned at PAG-IBIG. Meaning you're still
                      buying at PAG-IBIG and not from me. I also don't receive
                      any commission from them.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Is this free?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      Yes, this is free.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      How often do you update the properties listed here?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      Every weekend.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Are the properties listed here complete?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      No, this is because some PDFs displayed in PAG-IBIG have
                      inconsistent displays or blurred output, hence my bot is
                      not able to scrape the data from them. Rest assured, I am
                      working on it!
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      What does "confidence" rating mean in the Property detail
                      page?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      When I scrape the addresses, I convert it into a
                      coordinates (lat & lng), using an external service called
                      OpenCage. Here's what they mean by it:
                      <br />
                      <br />
                      <br />
                      <code>
                        (OpenCage) The best way to think of our confidence score
                        is as a measure of how confident we are that centre
                        point coordinates returned for the result precisely
                        reflect the result
                      </code>
                      <br />
                      <br />
                      <br />
                      Basically, higher number represents higher precision
                      (technically it means it can determine a more specific
                      bounds)
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                item
                sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
              >
                <Accordion
                  expanded
                  sx={{
                    width: "100%",
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                    borderRadius: "24px !important",
                  }}
                >
                  <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Do you accept donation?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="caption" fontSize="1rem">
                      JK. No one has ever asked me this.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FAQPage;
