var router = require('express').Router();
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ecs = new AWS.ECS();
var ec2 = new AWS.EC2();

router.route('/')
    .get((req, res) => {
        // let response = await ecs.listTasks({cluster: 'httpd-siab'});
        // console.log(response);
        // return res.json(req.headers);

        // ecs.listTasks({cluster:'httpd-siab'}, (err, data) => {
        //     if (err) return res.json(err);
        //     return res.json(data);
        // });
        ecs.waitFor('tasksRunning', { cluster: 'httpd-siab', tasks: ["arn:aws:ecs:us-east-1:999744867675:task/httpd-siab/51bc7a0e3c434accba57bf8742b6fc64"] }, (err, data) => {
            if (err) return res.json(err);
            data.tasks[0].attachments[0].details.forEach((each) => {
                if (each.name == 'networkInterfaceId') {
                    ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [ each.value ] }, (err, data) => {
                        if (err) return res.json(err);
                        return res.redirect(`http://${data.NetworkInterfaces[0].Association.PublicIp}:3001`);
                    })
                }
            });
        });
    });

    
router.route('/spawn')
    .get((req, res) => {
        let params = {
            taskDefinition: 'httpd_siab',
            cluster: 'httpd-siab',
            count: 1,
            launchType: "FARGATE",
            networkConfiguration: {
                awsvpcConfiguration: {
                  subnets: [
                    'subnet-92afc7f4'
                  ],
                  securityGroups: [
                    'sg-07b0588aee4fe9030',
                  ],
                  assignPublicIp: "ENABLED"
                }
              },
        }
        ecs.runTask(params, (err, data) => { 
            if (err) return res.json(err);
            let arn = data['tasks'][0]['taskArn'].split('/').pop();
            ecs.waitFor('tasksRunning', { cluster: 'httpd-siab', tasks: [arn] }, (err, data) => {
                if (err) return res.json(err);
                data.tasks[0].attachments[0].details.forEach((each) => {
                    if (each.name == 'networkInterfaceId') {
                        ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [ each.value ] }, (err, data) => {
                            if (err) return res.json(err);
                            return res.redirect(`http://${data.NetworkInterfaces[0].Association.PublicIp}:3001`);
                        })
                    }
                });
            });
        });
    });

router.route('/')
    .delete((req, res) => {
        let params = {
            task: 'c2f7dab80bfd4fffaa6616c0d63e6274',
            cluster: 'httpd-siab'
        }
        ecs.stopTask(params, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    });

module.exports = router;