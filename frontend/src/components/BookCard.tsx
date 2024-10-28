import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ImagePlaceholder } from "./BookDetails";

interface IBooks {
  id: string;
  title: string;
  author: string;
  description: string;
  image_url?: string;
}

interface BookCardProps {
  book: IBooks;
  onViewDetails: (id: string) => void;
}

const BookCard = ({ book, onViewDetails }: BookCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <ImagePlaceholder  />
          )}

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={book?.title}
        >
          {book?.title}
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={book?.author}
        >
          {book?.author}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
          title={book?.description}
        >
          {book?.description}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onViewDetails(book.id)}
          >
            Mais Detalhes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
