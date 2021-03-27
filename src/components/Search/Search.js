import React, { Component } from 'react'
import "./Search.css"

export class Sarch extends Component {

    render() {
        return (
            <>

                <div className="context">
                    <form className="searchbox">
                        <input type="search" placeholder="Search for Gym Buddy" />
                        <button type="submit" value="search">&nbsp;</button>
                    </form>

                    <div class="row">
                        <div class="column">
                            <div class="card">
                                <img src="2.png" />
                                <h1>Name</h1>
                                <p class="title">CEO & Founder</p>
                                <p>Skill</p>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <p><button>Add friend</button></p>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <img src="2.png" />
                                <h1>Name</h1>
                                <p class="title">CEO & Founder</p>
                                <p>Skill</p>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <p><button>Add friend</button></p>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <img src="2.png" />
                                <h1>Name</h1>
                                <p class="title">CEO & Founder</p>
                                <p>Skill</p>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <p><button>Add friend</button></p>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <img src="2.png" />
                                <h1>Name</h1>
                                <p class="title">CEO & Founder</p>
                                <p>Skill</p>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <p><button>Add friend</button></p>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="area" >
                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div >
            </>
        )
    }
}

export default Sarch
