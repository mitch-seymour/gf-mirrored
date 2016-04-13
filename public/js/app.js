
/**
 * Place widget
 *
 * @version 0.0.1
 */
var PlaceWidget = React.createClass({

    getInitialState: function () {

        return { data: [], filterText: '' };
        
    },
    handleFilterChange: function (filterText) {

        this.setState({ filterText: filterText });

    },
    loadPlacesFromServer: function () {
        
        // get a list of businesses from our API
        $.ajax({

            url: this.props.url,
            dataType: 'json',
            type: 'GET',
            success: function (res) {

                var data = res.data ? res.data.sort(function(a, b){

                    var p1 = a.attributes.business_name.toLowerCase(),
                        p2 = b.attributes.business_name.toLowerCase();

                    if(p1 < p2) return -1;
                    if(p1 > p2) return 1;
                    return 0;


                }) : [] ;

                this.setState({ data: data });

            }.bind(this),
            error: function (xhr, status, err) {

                console.error(this.props.url, status, err.toString());

            }.bind(this)

        });

    },
    componentDidMount: function () {

        this.loadPlacesFromServer();

    },
    render: function () {

        return (

            <div className="row">
                <div className="placeWidget col-md-6 col-sm-12 col-xs-12">
                    <h1>Businesses</h1>
                    <PlaceFilter filterChange={this.handleFilterChange} />
                    <PlaceList data={this.state.data} filterText={this.state.filterText} pollInterval={2000} />
                </div>
            </div>

        );

    }

  });

  var PlaceFilter = React.createClass({

    handleChange: function () {

        this.props.filterChange(
            this.refs.filterTextInput.value
        );

    },
    render: function () {

        return (
            <div>
                <input 
                    className="form-control"
                    type="text" onChange={this.handleChange}
                    ref="filterTextInput"
                />
            </div>
        );

    }

  });

  var PlaceList = React.createClass({

    render: function () {

        var filterText = this.props.filterText;

        var nodes = this.props.data.map(function(place, index){
            
            var len = filterText.length;
            
            if (filterText && place.attributes.business_name.slice(0, len).toLowerCase() !== filterText.toLowerCase()){
                return;
            } else if (!filterText){
                return;
            }

            place.attributes.status = place.attributes.closed ? 'closed' : 'open';

            return (
                <Place attributes={place.attributes} key={index}>
                    {place.attributes.business_name}
                </Place>
            );

        });
        
        return (

            <div className="placeList {}">
                {nodes}
            </div>

        );

    }


  });

  var Place = React.createClass({

    render: function () {

        var place = this.props.attributes;

        return (

            <div className="place">
                <p>
                    <i className="fa fa-map-marker marker"></i> 
                    {place.business_name}
                    <span className="placeStatus {place.status}">
                        {place.status}
                    </span>
                </p>
                <aside className="location">
                    {place.city}, {place.state}
                </aside>
            </div>

        );

    }

  });

  ReactDOM.render(
    <PlaceWidget url="/data" />,
    document.getElementById('app')
  );