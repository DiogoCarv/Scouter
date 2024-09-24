import './App.css';
import { Box, ButtonBase, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonBase className="botao_logo">
          <Link to="/">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Link>
        </ButtonBase>

        <div className="botoes_cabecalho">
          <ButtonBase className="botao_registrar">
            <Link to="/registrar" className="letra_botao">
              SAIR
            </Link>
          </ButtonBase>
        </div>
      </header>

      <main className='main'>
        <div className='form_container'>
          <Typography variant="h5" className="form_title">ENVIE SEU PROBLEMA</Typography>

          <TextField
            label="TÍTULO"
            variant="outlined"
            fullWidth
            className="input_field"
          />
          <TextField
            label="DESCRIÇÃO"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            className="input_field"
          />

          <Button variant="contained" component="label" className="upload_button">
            ESCOLHA O ARQUIVO
            <input type="file" hidden />
          </Button>

          <Button variant="contained" className="publish_button">
            PUBLICAR
          </Button>
        </div>
      </main>

      <footer className="rodape">
        <div className='direitos'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper',
              color: 'text.secondary',
              p: 2,
            }}
          >
            <Typography variant="body2">SCOUTER® - Marca Registrada</Typography>
            <Typography variant="body2">Copyright © 2024 | scouter.com | TODOS OS DIREITOS RESERVADOS</Typography>
          </Box>
        </div>
      </footer>
    </div>
  );
};

export default App;