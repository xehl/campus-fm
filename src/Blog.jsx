import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 821,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Header = styled(Box)(({theme}) => ({
  fontFamily: "Share Tech Mono",
  fontSize: "2.3rem",
  marginBottom: 15,
  marginTop: 30,
}));

const Subheader = styled(Box)(({theme}) => ({
  fontFamily: "Share Tech Mono",
  fontSize: "1.8rem",
  marginBottom: 15,
  marginTop: 30,
}));

const Paragraph = styled(Box)(({theme}) => ({
  fontFamily: "Share Tech Mono",
  fontSize: "1.2rem",
  marginBottom: 15,
}));

const StationCategory = styled(Box)(({ theme }) => ({
  marginTop: 30,
  fontFamily: "Share Tech Mono",
  width: "60%",
  border: "1px solid #000",
}));

export default function Blog() {

  useEffect(() => {
    // load custom fonts
    WebFont.load({
      google: {
        families: ["Monoton", "Turret Road", "Share Tech Mono"],
      },
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        background: "#f0f0f0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Box sx={{
          width: "75vw",
        }}>
          <Header>
            What are the best college radio stations?
          </Header>
          <Paragraph>
            In an age where so much music discovery is guided by algorithms and marketing budgets, college radio can be an amazing source of novelty and entertainment.
          </Paragraph>
          <Paragraph>
            Many campus radio stations pride themselves in broadcasting an eclectic variety of programming, including local bands, niche subgenres, music reviews, and periodic podcast/talk shows. And if you try listening to different stations side by side, you can start to pick up on regional and station-specific quirks.
          </Paragraph>
          <Subheader>
            Campus FM
          </Subheader>
          <Paragraph>
            I created <Link href="https://www.campus-fm.com">Campus FM</Link> to make it easier to discover and listen to college radio stations around the world. In the process, I’ve spent countless hours listening to more than a hundred college radio stations, and I’ve developed some opinions on which stations have the most well-managed and compelling programming.
          </Paragraph>
          <Subheader>
            What makes a good college radio station?
          </Subheader>
          <Paragraph>
            As a general rule, the best campus radio stations feature a complementary mix of youthful enthusiasm, ample free time, and a moderate to strong bias against the chart-topping pop music you’ll often hear on commercial radio stations. UT Austin's KVRX has a great tagline: "None of the hits, all of the time".
          </Paragraph>
          <Paragraph>
            Bear in mind, this is not an exhaustive list, and your favorite station might be missing. However, I can personally recommend each of the following:
          </Paragraph>
        </Box>
        <StationCategory>
          aaa
        </StationCategory>
      </Box>
    </ThemeProvider>
  )
}