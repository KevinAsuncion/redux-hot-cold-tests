import React from 'react';
import { shallow } from 'enzyme';

import { AuralStatus } from './aural-status';

describe('<AuralStatus />', ()=> {
    it('should reander without crashing', ()=> {
        shallow(<AuralStatus/>)
    })
    it('should render an aural status', () =>{
        let TEST_STATUS = 'This is an aural update'
        let wrapper = shallow(<AuralStatus auralStatus={TEST_STATUS}/>)
        expect(wrapper.contains(TEST_STATUS)).toEqual(true);
    })
})

