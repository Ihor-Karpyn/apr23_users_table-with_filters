import { FC, useEffect, useState } from 'react';
import './App.scss';
import {
  Button,
  Container, FormControl,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getNewId, prepareGood } from './helpers';
import { Color, Good } from './types/types';
import { colorsFromServer, goodsFromServer } from './dataFromServer';

export const App: FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);

  const [newGoodName, setNewGoodName] = useState('');
  const [newGoodColorId, setNewGoodColorId] = useState<number | null>(null);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [colorErrorMessage, setColorErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setColors(colorsFromServer);
      setGoods(goodsFromServer);
    }, 500);
  }, []);

  const goodsWithColoros = prepareGood(goods, colors);

  const clearForm = () => {
    setNewGoodColorId(null);
    setNewGoodName('');
    setNameErrorMessage('');
    setColorErrorMessage('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newGoodColorId || !newGoodName) {
      setNameErrorMessage(newGoodName
        ? ''
        : 'Name is required');

      setColorErrorMessage(newGoodColorId
        ? ''
        : 'Color is required');

      return;
    }

    setGoods((prevGoods) => {
      const newGodo: Good = {
        id: getNewId(prevGoods),
        name: newGoodName,
        colorId: newGoodColorId,
      };

      return [...prevGoods, newGodo];
    });

    clearForm();
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={12}>
        <form
          className="newGoodForm"
          onSubmit={onSubmit}
        >
          <TextField
            variant="standard"
            value={newGoodName}
            onChange={(event) => {
              setNameErrorMessage('');
              setNewGoodName(event.target.value);
            }}
            name="Good name"
            label="Good name"
            sx={{ marginRight: '8px' }}
            error={Boolean(nameErrorMessage)}
            helperText={nameErrorMessage}
          />

          <FormControl error={Boolean(colorErrorMessage)}>
            <InputLabel id="newGoodColor">Color</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="newGoodColor"
              value={newGoodColorId}
              onChange={(event) => {
                setColorErrorMessage('');
                setNewGoodColorId(Number(event.target.value) || null);
              }}
              variant="standard"
              sx={{ minWidth: '200px' }}
            >
              {colors.map(color => (
                <MenuItem
                  key={color.name}
                  value={color.id}
                >
                  {color.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{colorErrorMessage}</FormHelperText>
          </FormControl>
          <Button
            sx={{ marginLeft: '16px' }}
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
          >
            Save
          </Button>
        </form>
        <List>
          {goodsWithColoros.map(good => (
            <ListItem
              sx={{ color: good.color?.name || 'black' }}
              key={good.id}
            >
              {good.name}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
