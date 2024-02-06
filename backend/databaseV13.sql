ALTER TABLE `user` ADD `isvalid` BOOLEAN NOT NULL AFTER `allow`;

CREATE VIEW `model_fullwithCountry`
 AS select mu.id AS id,mu.model AS model,mu.provider AS provider,mu.pictures AS pictures,mu.price AS price,mu.owner AS owner,
mu.state AS state,m.name AS modelName,m.picture AS picture,m.reference AS reference,m.scalemates AS scalemates,b.name AS brandName,
p.name AS periodName,s.name AS scaleName,bu.name AS builderName,c.name AS categoryName,pr.name AS providerName,co.name as countryName,
st.name AS stateName 
from 
model_user mu join model m on mu.model = m.id
join brand b on m.brand = b.id 
join period p on m.period = p.id  
join scale s on m.scale = s.id 
join builders bu on m.builder = bu.id  
join  country  co on bu.country=co.id
join state st on mu.state=st.id
join category c on m.category = c.id
left join provider pr on mu.provider = pr.id;

ALTER TABLE `user` ADD `pwdTokenDate` DATETIME NULL AFTER `pwdtoken`;