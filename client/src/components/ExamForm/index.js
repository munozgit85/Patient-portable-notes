import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXAM } from "../../utils/mutations";

const ExamForm = ({ thoughtId }) => {
  const [addExam, { error }] = useMutation(ADD_EXAM);
  const [examBody, setExam] = useState("");
  const [ExamCount, setExamCount] = useState(0);

  const handleChangeExam = (event) => {
    if (event.target.value.length <= 280) {
      setExam(event.target.value);
      setExamCount(event.target.value.length);
    }
  };
  const handleFormSubmitExam = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addExam({
        variables: { examBody, thoughtId },
      });
      // clear form value
      setExam("");
      setExamCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${ExamCount === 280 || error ? "text-error" : ""}`}>
        Character Count: {ExamCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <h3 className="review"> Physical Exam</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmitExam}
      >
        <label
          name="examBody"
          value={examBody.examBody || ""}
          className="form-input col-12 col-md-9"
          onChange={handleChangeExam}
        >
          Head and Neck
          <select>
            <option value="Neck supple">Neck supple</option>
            <option value="Head atraumatic">Head atraumatic</option>
            <option value="traumatic head injury">traumatic head injury</option>
            <option value="enlarged goiter">enlarged goiter</option>
          </select>
          <br />
          Eyes and Ears
          <select>
            <option value="EOM">EOM</option>
            <option value="pupils equal and reactive">
              pupils equal and reactive
            </option>
            <option value="drainage">ear drainage</option>
            <option value="periorbital edema">periorbital edema</option>
          </select>
          <br />
          Nose and Mouth
          <select>
            <option value="Nose midline">Nose midline</option>
            <option value="Mouth with Lesions">Mouth with Lesions</option>
            <option value="Tongue Midline">tongue midline</option>
            <option value="Oral Mucosa moist without lesions">
              Oral Mucosa moist without lesions
            </option>
          </select>
          <br />
          Cardiovascular
          <select>
            <option value="RRR no m/r/g, no JVD, no carotid bruits ">
              Cardiac: RRR no m/r/g, no JVD, no carotid bruits
            </option>
            <option value="irregular HR">Cardiac:irregular HR</option>
            <option value="+ murmur">Cardiac:+ murmur</option>
            <option value="+ Gallop">Cardiac:+ Gallop</option>
          </select>
          <br />
          Lungs
          <select>
            <option value="- Clear to auscltation, no use of acessory muscles, no crackles or wheezes">
              Lungs: Clear to auscltation, no use of acessory muscles, no
              crackles or wheezes.
            </option>
            <option value="+ rhonchi"> Lungs:+ rhonchi</option>
            <option value="+ wheezes">Lungs:+ wheezes</option>
            <option value="+ crackles">Lungs:+ crackles</option>
          </select>
          <br />
          Skin
          <select>
            <option value=" No rashes, skin warm and dry, no erythematous areas ">
              Skin: No rashes, skin warm and dry, no erythematous areas
            </option>
            <option value="+ rash"> Skin:+ rash</option>
            <option value="+ suspicious lesion/lesions">
              Skin:+ suspicious lesion/lesions
            </option>
            <option value="+ Burns">Skin:+ Burns</option>
          </select>
          <br />
          Abdomen
          <select>
            <option value="Normal bowel sounds, abdomen soft and nontender">
              Abdomen:Normal bowel sounds, abdomen soft and nontender
            </option>
            <option value="+ Tender ">Abdomen:+ Tender</option>
            <option value="+ distended">Abdomen:+ distended</option>
            <option value="+ Enlarged Liver">Abdomen:+ Enlarged Liver</option>
          </select>
          <br />
          Genitourinary
          <select>
            <option value="no bladder distention">
              Genitourinary :no bladder distention
            </option>
            <option value="+ suprapubic tenderness">
              Genitourinary :+ suprapubic tenderness
            </option>
            <option value="+ clear yellow urine">
              {" "}
              Genitourinary :+ clear yellow urine
            </option>
          </select>
          <br />
          MusculoSkeletal
          <select>
            <option
              value=" 5/5 strength, normal range of motion, no swollen or erythematous
joints."
            >
              MusculoSkeletal : 5/5 strength, normal range of motion, no swollen
              or erythematous joints.
            </option>
            <option value="+ swelling">MusculoSkeletal :+ swelling</option>
            <option value="+ pain">MusculoSkeletal:+ pain</option>
          </select>
          <br />
          Neurological
          <select>
            <option value="Alert and oriented x 3, CN 2-12 grossly intact.">
              Neurological: Alert and oriented x 3, CN 2-12 grossly intact
            </option>
            <option value="Disoriented"> Neurological:+ Disoriented</option>
            <option value="+ weakness"> Neurological:+ weakness</option>
            <option value="+ aphasia"> Neurological:+ aphasia</option>
            <option value="+ ataxia"> Neurological:+ ataxia</option>
          </select>
          <br />
        </label>
        <button className="btn col-12 col-md-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExamForm;
