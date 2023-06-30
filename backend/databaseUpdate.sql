/* Update to V1.2 */

DROP VIEW IF EXISTS `mymodels`;
CREATE  VIEW mymodels  AS 
SELECT mu.id AS id, mu.model AS idModel, mu.state AS state, mu.pictures AS pictures,mu.price ,mu.owner AS owner, s.name AS stateName, m.name AS modelName, m.reference AS reference, m.picture AS boxPicture, bu.name AS builderName, st.name AS scaleName, br.name AS brandName,p.name as providerName 
FROM
model_user mu inner join state s on mu.state = s.id
 inner join model m on mu.model = m.id 
 inner join builders bu on m.builder = bu.id 
 inner join scale st on m.scale = st.id 
 inner join brand br on m.brand = br.id
 left join provider p ON mu.provider=p.id;