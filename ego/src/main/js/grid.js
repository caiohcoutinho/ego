// TODO: Deveria estar em um utils de Matemática.
var RandomGenerator = function(seed){
    this.seed = seed || 1;
    this.random = function(){
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280;
        return rnd;
    }
}

var random = new RandomGenerator(1);

// TODO: Usado para gerar o ambiente
var interpolate = function(i, n, c1, c2){
    var c1 = parseFloat(c1);
    var c2 = parseFloat(c2);
    var r = c1 + (c2-c1)*i/(n-1);
    return Math.floor(r);
}

// Classes de view
var GridCell = React.createClass({
    getInitialState: function(){
        return {
            c1: {r: this.props.r, g: this.props.g, b: this.props.b}
        }
    },
    render: function(){
        var rgb = "rgb("+this.state.c1.r+", "+this.state.c1.g+", "+this.state.c1.b+")";
        var style = {
            "backgroundColor": rgb,
            "opacity": "0.4",
            "width": 30,
            "height": 30,
        };
        var food = this.state.c1.g;
        var rocks = this.state.c1.b;
        var temperature = this.state.c1.r;
        var title = "Food: "+food+" Rocks: "+rocks+" Temperature: "+temperature;
        return (
            <td style={style} title={title}> </td>
        );
    }
});

var GridRow = React.createClass({
    getInitialState: function(){
        return {
            columns: this.props.columns,
            c1: {r: this.props.r1, g: this.props.g1, b: this.props.b1},
            c2: {r: this.props.r2, g: this.props.g2, b: this.props.b2},
        }
    },
    render: function(){
        var n = this.state.columns;
        var state = this.state;
        var columns = _.map(_.range(n), function(j){
            var r = interpolate(j, n, state.c1.r, state.c2.r);
            var g = interpolate(j, n, state.c1.g, state.c2.g);
            var b = interpolate(j, n, state.c1.b, state.c2.b);
            return (
                <GridCell key={j}
                    r={r}
                    g={g}
                    b={b}
                />
            );
        });
        return (
            <tr>
                {columns}
            </tr>
        )
    }
});

var GridTable = React.createClass({
  getInitialState: function(){
    return {
        columns: 16,
        rows: 16,
        c1: {r: 255, g:0, b:0},
        c2: {r: 0, g:255, b:0},
        c3: {r: 0, g: 0, b: 255},
        c4: {r: 0, g:0, b:0}
    }
  },
  render: function() {
    var columns = this.state.columns;
    var n = this.state.rows;
    var state = this.state;
    var rows = _.map(_.range(n), function(i){
        var R1 = interpolate(i, n, state.c1.r, state.c4.r);
        var R2 = interpolate(i, n, state.c2.r, state.c3.r);
        var G1 = interpolate(i, n, state.c1.g, state.c4.g);
        var G2 = interpolate(i, n, state.c2.g, state.c3.g);
        var B1 = interpolate(i, n, state.c1.b, state.c4.b);
        var B2 = interpolate(i, n, state.c2.b, state.c3.b);
        console.log({r: R2, g: G2, b: B2});
        return (
            <GridRow columns={columns} key={i}
                r1={R1} r2={R2}
                g1={G1} g2={G2}
                b1={B1} b2={B2}
            />
        );
    });
    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
  }
});

// TODO: Inicializar o componente deveria estar no html?
ReactDOM.render(
    <div>
        <GridTable />
    </div>,
    document.getElementById('grid')
);
