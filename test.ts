import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from './server';

chai.use(chaiHttp);

describe('GET /', () => {
  it('should return the provided NAME in the response', (done) => {
    const name = 'John';

    chai
      .request(app)
      .get('/')
      .query({ name })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal(`Query parameters sent: name: ${name}`);
        done();
      });
  });
    
    // Add another test case here that shows the case of name = "John <script>alert(1)</script>" and expect the response to be "Hi, you entered John &lt;script&gt;alert(1)&lt;/script&gt;"
    it('should return the provided NAME in the response removing MALICIOUS code', (done) => {
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
  
    it('should return the provided ID  in the response', (done) => {
      const id = '1234';
  
      chai
        .request(app)
        .get('/')
        .query({ id })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal(`Query parameters sent: id: ${id}`);
          done();
        });
    });
      
      // Add another test case here that shows the case of ID = "1234<script>alert(1)</script>" and expect the response to be "Hi, you entered John &lt;script&gt;alert(1)&lt;/script&gt;"
      it('should return the provided ID in the response removing malicious code', (done) => {
        const id = '1234<script>alert(1)</script>';
        const cleanId = '1234';
          
              chai
              .request(app)
              .get('/')
              .query({ id })
              .end((err, res) => {
                  expect(res).to.have.status(422);
                  expect(res.text).to.equal(`Invalid input id ${cleanId}`);
                  done();
              });
      });
    
});
