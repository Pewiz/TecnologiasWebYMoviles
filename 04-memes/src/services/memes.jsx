const urlBase = "https://memes-api.grye.org";

export const autenticar = async (usuario, contraceña) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraceña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const registrar = async (usuario, contraceña) => {
  try {
    const respuesta = await fetch(`${urlBase}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: usuario,
        password: contraceña,
      }).toString(),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const obtenerMemes = async (pagina, cantidad) => {
  try {
    const url = `${urlBase}/memes/?page=${pagina}&limit=${cantidad}`;
    const respuesta = await fetch(url);

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al obtener memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const subirMeme = async (token, titulo, descripcion, imagen) => {
  try {
    if (!token) {
      return [null, "Debes iniciar sesión para subir un meme."];
    }

    const url = `${urlBase}/memes/?title=${titulo}&description=${descripcion}`;

    const dataFormulario = new FormData();
    dataFormulario.append("file", imagen);

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: dataFormulario,
    });

    if (!respuesta.ok) {
      return [null, "Error al subir meme"];
    }
    const urlMemes = `${urlBase}/memes/?sort_by=new&page=1&limit=10`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const responseMemes = await fetch(urlMemes, options);
    const newData = await responseMemes.json();

    return [newData, null]; // Devolver los datos actualizados
  } catch (error) {
    return [null, error.message || "Error al subir meme"];
  }
};
