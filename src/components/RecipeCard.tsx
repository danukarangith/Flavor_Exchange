import * as React from 'react';
import { Card, CardContent, Typography, CardHeader, CardMedia, IconButton, Avatar, Collapse, Box } from "@mui/material";
import { red } from '@mui/material/colors';
import { Favorite as FavoriteIcon, Share as ShareIcon, ExpandMore as ExpandMoreIcon, MoreVert } from '@mui/icons-material';
import { Recipe } from "../store/useStore";

import { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
    onClick: () => void;
}

const ExpandMore = (props: ExpandMoreProps) => {
    const { expand, onClick, children, ...other } = props;

    return (
        <IconButton
            {...other}
            onClick={onClick}
            sx={{
                transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
            }}
        >
            {children}
        </IconButton>
    );
};

type Props = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{
            maxWidth: 360,
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
            }
        }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: red[500],
                            width: 48,
                            height: 48,
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.1)' }
                        }}
                        aria-label="recipe"
                    >
                        {recipe.title?.charAt(0).toUpperCase() || "R"}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" sx={{ color: 'grey.600' }}>
                        <MoreVert />
                    </IconButton>
                }
                title={
                    <Typography variant="h6" fontWeight="600" color="text.primary">
                        {recipe.title}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        Recipe ID: {recipe.id}
                    </Typography>
                }
                sx={{ pb: 1 }}
            />
            <CardMedia
                component="img"
                height="220"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                    objectFit: 'cover',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                }}
            />
            <CardContent sx={{ py: 1 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        textAlign: 'right'
                    }}
                >
                    Created by {recipe.createdBy}
                </Typography>
            </CardContent>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                pb: 2,
                borderTop: expanded ? 0 : '1px solid',
                borderColor: 'divider'
            }}>
                <IconButton
                    aria-label="add to favorites"
                    sx={{
                        color: red[500],
                        '&:hover': { color: red[700] }
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    sx={{
                        color: 'primary.main',
                        '&:hover': { color: 'primary.dark' }
                    }}
                >
                    <ShareIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{
                        color: expanded ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{
                    bgcolor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="500"
                        gutterBottom
                    >
                        Cooking Method
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line' }}
                    >
                        {recipe.createdBy || "Method details coming soon..."}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}