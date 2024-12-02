var express = require('express');
var path = require('path');
var app = express();

var client_id = 'BSDKxMEk3jWzgK4iiTk1'; // 네이버 개발자 센터에서 발급받은 Client ID
var client_secret = 'dEkL8sMqEy'; // 네이버 개발자 센터에서 발급받은 Client Secret
var state = "RANDOM_STATE"; // CSRF 방지용 상태값
var redirectURI = encodeURI("http://127.0.0.1:8081/callback");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// 로그인 페이지
app.get('/', function (req, res) {
  var api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
  res.render('login', { api_url: api_url });
});

// 콜백 처리
app.get('/callback', function (req, res) {
  var code = req.query.code;
  var state = req.query.state;
  var api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

  var request = require('request');
  var options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
  };
  
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body); // 인증 성공 후 응답 데이터 출력
    } else {
      res.status(response.statusCode).send('Authentication failed');
    }
  });
});

// 서버 실행
app.listen(8081, function () {
  console.log('Server is running on http://127.0.0.1:8081');
});