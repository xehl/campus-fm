import { Box, Typography, Modal, Divider, List, ListItem, Link } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const faqTheme = createTheme({
  typography: {
    fontFamily: "Share Tech Mono",
    fontSize: { xs: 16, sm: 18 }
  }
})

export default function FaqModal({ faqOpen, handleFaqClose }) {
  return (
      <Modal
      open={faqOpen}
      onClose={handleFaqClose}
    >
      <ThemeProvider theme={faqTheme}>
        <Box 
          sx={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: "80vh",
            width: "80vw",
            bgcolor: "#2e2e2e",
            border: "5px solid #b0b0b0",
            boxShadow: 2,
            outline: 0,
            overflowX: 'hidden',
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Typography sx={{
              pl: 3,
              pt: {xs: 2, sm: 1},
              pb: 1,
              fontSize: {xs: 24, sm: 38},
              color: "white",
            }}>
              Frequently Asked Questions
            </Typography>
            <CloseIcon onClick={handleFaqClose} sx={{ display: {xs: "none", sm:"block"}, fontSize: 40, cursor:"pointer", color: "white", pr: 2}}/>
          </Box>
          <List>
            <Divider variant="inset" color="#b0b0b0" />
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic"
              }}>
                I don’t see my college radio station. Can you add it?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  Absolutely! It’s pretty easy for me to add new stations, and I’m always looking for new radio stations to listen to. Feel free to suggest stations via this form!
                </Typography>
              </Typography>
            </ListItem>
            <Divider variant="inset" color="#b0b0b0" />
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic"
              }}>
                What does it mean if a station is grayed out?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  If a station card is gray, that means the app is still loading its corresponding audio stream. It should be ready to play soon!
                </Typography>
              </Typography>
            </ListItem>
            <Divider variant="inset" color="#b0b0b0" />
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic"
              }}>
                Why do the stations periodically turn gray?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  In order to smoothly switch between streams, Campus FM keeps a small cache of audio data available for each station. After some time has passed, the cached audio gets stale and the app requests more recent content. The station is grayed out during this loading period.
                </Typography>
              </Typography>
            </ListItem>
            <Divider variant="inset" color="#b0b0b0" />
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic"
              }}>
                The app isn’t working on my device / I’ve spotted a bug / I’d like to see [insert feature here].
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  That’s awesome (or I’m sorry)! I’m still learning how to build web apps and I love getting feedback! If you have a Github account, you can open an issue directly on the <Link target="_blank" href="https://github.com/xehl/campus-fm">Campus FM repo</Link>, or you can get in touch with me at <Link href={`mailto:hello.campusfm@gmail.com`}>hello.campusfm@gmail.com</Link>.
                </Typography>
              </Typography>
            </ListItem>
            <Divider variant="inset" color="#b0b0b0" />
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                width: "100%",
                boxSizing: "border-box",
                p: 3,
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic"
              }}>
                How can I share Campus FM?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  I’m working on creating customized sharing links that allow users to send the app around with their chosen stations preloaded (coming soon!).
                </Typography>
              </Typography>
            </ListItem>
          </List>
        </Box>
      </ThemeProvider>
    </Modal>
  )
}