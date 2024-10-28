import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  BrokenImage as BrokenImageIcon,
} from "@mui/icons-material";
import { IBooks } from "../types/books";
import { useUser } from "../contexts/UserContext";

export const ImagePlaceholder = () => (
  <Box
    sx={{
      width: "100%",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: 1,
    }}
  >
    <BrokenImageIcon
      sx={{
        fontSize: 64,
        color: "#9e9e9e",
        mb: 2,
      }}
    />
    <Typography variant="body2" color="text.secondary" align="center">
      Imagem não disponível
    </Typography>
  </Box>
);

export default function BookDetails({ book }: { book: IBooks }) {
  const { user } = useUser();

  return (
    <Paper
      elevation={3}
      sx={{
        height: "83vh",
        m: 2,
        overflow: "auto",
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "350px" },
            display: "flex",
            flexDirection: "column",
            p: 3,
            borderRight: { md: 1 },
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              mb: 2,
              textAlign: "center",
            }}
          >
            {book?.title}
          </Typography>
          {book?.image_url ? (
            <CardMedia
              component="img"
              image={book.image_url}
              alt={book?.title}
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />
          ) : (
            <ImagePlaceholder />
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PersonIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Cadastrado por: {user?.name}
            </Typography>
          </Box>
        </Box>
        <CardContent
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6">Detalhes do Livro</Typography>
            <Divider />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                Título
              </Typography>
              <Typography variant="body1">{book?.title}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                Autor
              </Typography>
              <Typography variant="body1">{book?.author}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                Descrição
              </Typography>
              <Typography variant="body1">{book?.description}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
}
