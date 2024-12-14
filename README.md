# Rising Athletes - Support our future Super Stars

### The platform aims to support children in sports by raising funds and incentives for families facing unexpected expenses such as travel and accommodation; sporting gear and fees and levys.


## Built With and technologies used:

- [Django Framework](https://docs.djangoproject.com/en/)
- [Fly.io](https://fly.io/docs/)
- [Insomnia] (https://docs.insomnia.rest/)

## Deployed at:
[Backend] https://risingathletes-495c4007dfac.herokuapp.com

[Frontend] (https://warm-paprenjak-8018c5.netlify.app/)


### Step by step instructions for how to register a new user and create a new project (i.e. endpoints and body data).
​
1. Create User
​
```shell
curl --request POST \
  --url https://risingathletes-495c4007dfac.herokuapp.com/projects/users/ 
  --header 'Content-Type: application/json' \
  --data '{
	"username": "testuser",
	"email": "not@myemail.com",
	"password": "not-my-password"
}'
```
​
2. Sign in User
​
```shell
curl --request POST \
  --url https://risingathletes-495c4007dfac.herokuapp.com/projects//api-token-auth/ \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "testuser",
	"password": "not-my-password"
}'
```
​
3. Create Project
​
```shell
curl --request POST \
  --url https://risingathletes-495c4007dfac.herokuapp.com/projects/ \
  --header 'Authorization: Token 6749c394c5295584f2e8488e3f647082da038b6b' \
  --header 'Content-Type: application/json' \
  --data '{
{
    "title": "State Tennis Tournament - GoldCoast",
    "description": "Please help my daughter to get to her State Tennis Tournament on the GoldCoast in July 2025. She has been selected by the recent regional trails and was lcuky enough to make the State Team. With the struggles of cost of living expenses, we urgently seeking assistance to help travel to and from cairns to make her dream come through. We will be greatful and contributions big or small",
    "goal": 2500,
    "image": "https://via.placeholder.com/300.jpg",
	"is_open": "True"

  }'
```

\*\* take the link (https://risingathletes-495c4007dfac.herokuapp.com/) and put it on your browser
</br></br>

<ins>User Account (crowfund starter)</ins>
- username
- password
- email address
- organisation (optional)

<ins>Organisation Account</ins>
- organisation
- password
- email

<ins>User Account (pledger)</ins>
- username
- password
- email address
- funds pledged to

<ins>Fund/Project</ins>
- project name 
- owner
- description
- images
- goal amount
- date until funds can be given
- project updates
- when project was created
- on going fundraiser (optional)
- ability to return funds if fundraiser fails

<ins>Pledges</ins>
- amount
- project to be pledged to
- pledger
- anonymous/not
- comment
- ability to withdraw a pledge



