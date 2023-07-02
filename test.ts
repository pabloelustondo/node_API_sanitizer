import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from './server';

chai.use(chaiHttp);

describe('GET /', () => {
  it('should return the provided name in the response', (done) => {
    const name = 'John';

    chai
      .request(app)
      .get('/')
      .query({ name })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal(`Hi, you entered ${name}`);
        done();
      });
  });
    
    // Add another test case here that shows the case of name = "John <script>alert(1)</script>" and expect the response to be "Hi, you entered John &lt;script&gt;alert(1)&lt;/script&gt;"
    it('should return the provided name in the response removing malicious code', (done) => {
      const name = 'John <script>alert(1)</script>';
      const cleanName = 'John';
        
            chai
            .request(app)
            .get('/')
            .query({ name })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.text).to.equal(`Invalid input name ${cleanName}`);
                done();
            });
    });
    
});
