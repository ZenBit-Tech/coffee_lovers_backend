const resetPasswordTemplate = (url: string): string => {
  return `
    <html>
      <head>
        <style>
          p {
            font-size: 18px;
          }
          button {
            padding: 10px 25px;
            background-color: #0202b8;
            border: none;
            border-radius: 5px;  
          }
          button>a {
            text-decoration: none;
            color: #fff;
            font-size: 14px;
          }
          button>a>font {
            color: #fff;
          }
        </style>
      </head>
      <body>
        <p>There is a link to reset password on platform</p>
        <button><a href="${url}" target="_blank"><font>Continue</font></a></button>
      </body>
    </html>
  `;
};

export default resetPasswordTemplate;
