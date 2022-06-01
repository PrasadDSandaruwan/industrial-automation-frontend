import React, {Component} from "react";
import MachineService from "../../services/admin/machineService";
import MachineDemo from "../components/common/machineDemo";
import AlarmDemo from "../components/common/alarmDemo";
import { toast } from "react-toastify";

class DemoPage extends Component{

    state = {
        isRedirect: false,
        data : []
        

    }

    componentDidMount = async () => {
        try{
            const response = await MachineService.getDemoDetails();

            
            if (response.status === 200  ) {
              if (response.data.code === 200) {
                // const data = [...this.data]
                console.log('Start', response.data.data)
                const data = response.data.data;
                this.setState({data});
              
              } else {
                this.setState({ isRedirect: true });
                toast.error("Error Occured!")
              }
            } else {
              this.setState({ isRedirect: true });
              toast.error("Error Occured!")
            }
          }catch (error) {
            alert("Error occured!");
            console.log("Error inside catch", error)
          }  
      };

    render(){
        const data = this.state.data;
        return(
            <React.Fragment>
                {data.length > 0 && 
                
                data.map((lines) => (
                    <div>
                        {/* <h1>Testing {lines.length}</h1> */}

                        {lines.map((line) => (
                            
                            <div className="container raw">
                            <div className="col-6 float-left">
                            {line.machine && <MachineDemo 
                                {...line.machine}
                            ></MachineDemo>}
                            </div>


                            <div className="col-6 float-left">
                            {line.alarm && Object.keys(line.alarm).length !== 0 &&  <AlarmDemo 
                                {...line.alarm}
                            ></AlarmDemo>}
                            </div>
                            </div>
                        ))}

                    </div>
                ))

                }
            </React.Fragment>
        )
    }
}
export default DemoPage