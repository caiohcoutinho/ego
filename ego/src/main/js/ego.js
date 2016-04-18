var Ego = (function(){
    var Field = function(points){
        this.points = points;
        this.seeFood = function(x, y){
            return points[x][y].food;
        };
    };

    Field.Point = function(temperature, food, rock){
          this.food = food;
          this.rock = rock;
          this.temperature = temperature;
    };

    var Creature = function(id, name, health, age, position){
        this.id = id;
        this.name = name;
        this.health = health;
        this.age = age;
        this.position = position;
        this.move = function(x, y){
            this.position = {x: x, y: y};
        };
    };

    var validateParameters = function(width, height, pointsDescription){
        var EXCEPTION = "interpolatedField: ";

        if(!_.isNumber(width)){
            throw EXCEPTION+" width is not a number";
        }
        if(!_.isNumber(height)){
            throw EXCEPTION+" height is not a number";
        }

        _.each(pointsDescription, function(point, index){
            if(_.isUndefined(point)){
                throw EXCEPTION+(index+1)+" point is undefined";
            }
            _.each(['food', 'rock', 'temperature'], function(property){
                if(!_.has(point, property)){
                    var message = EXCEPTION+(index+1)+" point does not have '"+property+"' property. Point: "+point;
                    throw message;
                }
            });
        });
    }

    var interpolate = function(i, n, c1, c2){
        var c1 = parseFloat(c1);
        var c2 = parseFloat(c2);
        var r = c1 + (c2-c1)*i/(n-1);
        return Math.floor(r);
    }

    Field.interpolatedField = function(width, height, pointsDescription){
        validateParameters(width, height, pointsDescription);

        var points = [];

        var p0 = pointsDescription[0];
        var p1 = pointsDescription[1];
        var p2 = pointsDescription[2];
        var p3 = pointsDescription[3];

        _.each(_.range(height), function(i){
            var e1 = new Point(
                interpolate(i, height, p0.temperature, p3.temperature),
                interpolate(i, height, p0.food, p3.food),
                interpolate(i, height, p0.rock, p3.rock)
            );
            var e2 = new Point(
                interpolate(i, height, p1.temperature, p2.temperature),
                interpolate(i, height, p1.food, p2.food),
                interpolate(i, height, p1.rock, p2.rock)
            );
            var row = [];
            _.each(_.range(width), function(j){
                row.push(new Point(
                    interpolate(j, width, e1.temperature, e2.temperature),
                    interpolate(j, width, e1.food, e2.food),
                    interpolate(j, width, e1.rock, e2.rock)
                ));
            });
            points.push(row);
        });

        return new Field(points);
    };

    return {
        Field : Field,
        Creature : Creature
    }
})()
