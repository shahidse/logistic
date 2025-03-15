'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CustomIconButton from './CustomIconButton';
import { KeyboardArrowRight } from '@mui/icons-material';
import CustomPieCahrt from './CustomPieChart';

const cards = [
  {
    id: 1,
    title: 'Sales',
    description: 'Plants are essential for all life.',
    backgroundColor: "rgba(28, 200, 247, 0.2)", // Light Blue
    border: "1px solid rgba(28, 200, 247, 0.3)",
    active: 'rgba(28, 200, 247, 0.4)',
    hover: 'rgba(28, 200, 247, 0.6)',
    arrow: 'rgba(28, 200, 247, 0.9)',
    textColor: "#03445D" // Dark Blue for contrast
  },
  {
    id: 2,
    title: 'Products',
    description: 'Animals are a part of nature.',
    backgroundColor: "rgba(75, 196, 196, 0.2)", // Teal
    border: "1px solid rgba(75, 196, 196, 0.3)",
    active: 'rgba(75, 196, 196, 0.4)',
    hover: 'rgba(75, 196, 196, 0.6)',
    arrow: 'rgba(75, 196, 196, 0.9)',
    textColor: "#004040" // Dark Cyan for contrast
  },
  {
    id: 3,
    title: 'Company',
    description: 'Humans depend on plants and animals for survival.',
    backgroundColor: "rgba(10, 246, 82, 0.2)", // Bright Green
    border: "1px solid rgba(10, 246, 82, 0.3)",
    active: 'rgba(10, 246, 82, 0.4)',
    hover: 'rgba(10, 246, 82, 0.6)',
    arrow: 'rgba(10, 246, 82, 0.9)',
    textColor: "#005A20" // Dark Green for contrast
  },
  {
    id: 4, // Fixed duplicate id
    title: 'Clients',
    description: 'Humans depend on plants and animals for survival.',
    backgroundColor: "rgba(43, 62, 235, 0.2)", // Deep Blue
    border: "1px solid rgba(43, 62, 235, 0.3)",
    active: 'rgba(43, 62, 235, 0.4)',
    hover: 'rgba(43, 62, 235, 0.6)',
    arrow: 'rgba(43, 62, 235, 0.9)',
    textColor: "#000A80" // Dark Navy for contrast
  },
];

const handleArrow = () => {

}
function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        // width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 4,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} className='flex max-w-[45%] md:max-w-[30%] lg:max-w-[23%] ' sx={{
          backgroundColor: card.backgroundColor, // #1cc8f7 with 20% opacity
          backdropFilter: 'blur(10px)', // Glass effect
          border: card.border, // Soft border for depth
          borderRadius: '16px',
        }} variant='outlined'>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: card.active,
                '&:hover': {
                  backgroundColor: card.hover,
                },

              },

            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h4" component="div" className='flex justify-between items-center ' sx={{
                color: card.textColor
              }}>
                {card.title}
                <CustomIconButton handle={handleArrow} ><KeyboardArrowRight sx={{
                  color: card.arrow,
                  fontSize: "40px"
                }}></KeyboardArrowRight></CustomIconButton>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {card.description}
                {card.description}
                <CustomPieCahrt width={100} height={ 100} />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
