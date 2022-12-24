import { Box, Typography, Modal, Divider, List, ListItem, Link } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactGA from "react-ga4";

const faqTheme = createTheme({
  typography: {
    fontFamily: "Share Tech Mono",
    fontSize: 16
  }
})

export default function FaqModal({ faqOpen, handleFaqClose }) {

  function suggestionFormEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked on suggestion form link"
    });
  }

  function repoLinkEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked on repo link in FAQ"
    });
  }

  function emailLinkEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked on email link in FAQ"
    });
  }

  function coffeeLinkEvent() {
    ReactGA.event({
      category: "External Link",
      action: "User clicked on Buy Me a Coffee link in FAQ"
    });
  }

  return (
    <Modal
    open={faqOpen}
    onClose={handleFaqClose}
    >
      <>
      <ThemeProvider theme={faqTheme}>
        <Box 
          sx={{
            position: "absolute",
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: "70vh",
            width: "85vw",
            border: "1px solid #b0b0b0",
            boxShadow: 2,
            outline: 0,
            overflowX: 'hidden',
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(46,46,46,0.9)",
            backdropFilter: "blur(5px)"
          }}
        >
          <Box sx={{
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(46,46,46,1)",
            position: "sticky",
            top: 0,
            zIndex: 20,
            borderBottom: 1,
            borderColor: "#b0b0b0"
          }}>
            <Typography sx={{
              pl: 3,
              pt: {xs: 2, sm: 1},
              pb: 1,
              fontSize: {xs: 30, sm: 45},
              color: "white",
            }}>
              FAQ
            </Typography>
            <CloseIcon onClick={handleFaqClose} sx={{ fontSize: {xs: 25, sm: 40}, cursor:"pointer", color: "white", pr: 2}}/>
          </Box>
          <List>
            <ListItem sx={{p: 0}}>
              <Typography sx={{
                mt: {xs: -1.5, sm: 0},
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
                  Absolutely! It’s pretty easy for me to add stations to Campus FM, and I’m always looking for new college radio stations to listen to. I'm especially interested in international college radio; it's harder for me to find non-English speaking radio streams and assess if they're college stations (vs. regular network radio). Feel free to suggest new stations via <Link onClick={ suggestionFormEvent } target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfZGNdhSsSnp9P2UqlhO8E1j0gMHxXavHea-rHIQjFPdCCbMw/viewform">this form</Link>!
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
                I've been waiting for a while now, why isn't my station loading?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                  IT practices aren't consistent across all college radio stations. Sometimes they have security restrictions that prevent their audio streams from loading on certain apps and devices. And sometimes the online audio streams just go offline for a while.
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
                    That’s awesome (or I’m sorry)! I would love your feedback; if you have a Github account, you can open an issue directly on the <Link target="_blank" onClick={repoLinkEvent} href="https://github.com/xehl/campus-fm">Campus FM repo</Link>, or you can get in touch with me at <Link onClick={ emailLinkEvent } href={`mailto:hello.campusfm@gmail.com`}>hello.campusfm@gmail.com</Link>
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
                Are you going to monetize Campus FM?
                <Typography sx={{
                  mt: 2,
                  color: "#e8e8e8",
                  fontStyle: "normal"
                }}>
                    I don't have plans to monetize right now, but you can buy me a coffee <Link target="_blank" onClick={coffeeLinkEvent} href="https://www.buymeacoffee.com/ehlee">here</Link> if you're feeling generous!
                </Typography>
              </Typography>
            </ListItem>
          </List>
        </Box>
      </ThemeProvider>
      </>
    </Modal>
  )
}