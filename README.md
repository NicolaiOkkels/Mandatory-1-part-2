# Mandetory 1 - part 2

## Exposee. 

Create a way for the integrator to register and unregister webhooks of various type events. Don’t worry about authentication and authorization for this assignment. 

An event could be “payment received, payment processed” or “invoice processing, invoice completed” etc. You decide the theme of your system as long as you make it clear in the documentation.

It’s a good idea to save the registered endpoints in persistent storage. Don’t overthink it and Sqlite, Nedb or even just plaintext files are some of the excellent choices.  

You must create scripts that can be invoked which will update the integrators endpoint for certain types of event with certain types of data. A dummy payload is fine. 

You must create a ping event when a webhook has been registered. To help the integrator maybe you could create something that will call all the endpoints at random intervals. 

 
## Integrator.
Create a script that registers endpoints.

Create a server where the endpoint is defined which is ready to received data from the webbhook. 

 
## Hosting. 
The system must be deployed at one point but it’s not requirement for it to run for the exam. 


## Documentation.

As always, all information on how to integrate should be clear via documentation. 