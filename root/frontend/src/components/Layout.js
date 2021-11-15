import React from 'react'
import {
    Routes, Route, Link
} from 'react-router-dom';
import Welcome from './authPage/Welcome';
import ResourceStore from './ResourceHub/ResourceStore';
import Forum from './Forum/Forum';

export default function Layout() {
    return (
        <div>
            <Routes>
                < Route exact path = '/'
                element = {
                    < Welcome />
                }
                />
                < Route exact path = '/hub'
                element = {
                    < ResourceStore />
                }
                />
                < Route exact path = '/forum'
                element = {
                    < Forum />
                }
                />
                < Route exact path = '/signin'
                element = {
                    < Welcome />
                }
                />

            </Routes>
        </div>
    )
}
