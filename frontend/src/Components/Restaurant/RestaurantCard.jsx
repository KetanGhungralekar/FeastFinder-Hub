import { Card, Chip, IconButton, Box, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Addtofavourites } from "../State/Authentication/Action";
import { isPresentinFavourites } from "../config/logic";

export const RestaurantCard = ({ item }) => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const handleAddToFavourite = () => {
        dispatch(Addtofavourites({ token, restaurantId: item.id }));
    };

    const handleNavigatetoRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    };

    return (
        <Card
            onClick={handleNavigatetoRestaurant}
            className={`m-5 w-[17rem] ${item.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": item.open && {
                    transform: "translateY(-10px) scale(1.03)",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            {/* Image & Status */}
            <Box
                className="relative"
                sx={{
                    position: "relative",
                    height: "10rem",
                    overflow: "hidden",
                    borderRadius: "4px 4px 0 0",
                }}
            >
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{
                        filter: item.open ? "none" : "grayscale(100%)",
                        opacity: item.open ? 1 : 0.7,
                    }}
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Open" : "Closed"}
                />
            </Box>

            {/* Info & Favorite Icon */}
            <Box className="p-4 flex justify-between items-start">
                <Box sx={{ flex: 1, cursor: item.open ? "pointer" : "default" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.description}
                    </Typography>
                </Box>
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavourite();
                    }}
                >
                    {isPresentinFavourites(auth.favourites, item) ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </Box>
        </Card>
    );
};
